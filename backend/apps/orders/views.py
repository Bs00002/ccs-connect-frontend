import json
from decimal import Decimal
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from apps.accounts.models import UserRole
from apps.products.models import Product
from .models import Order, OrderItem, OrderStatus
from .serializers import OrderSerializer, OrderItemSerializer

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    search_fields = ['order_number', 'dealer__username']
    filterset_fields = ['status', 'payment_status', 'dealer']

    def get_queryset(self):
        user = self.request.user
        qs = Order.objects.select_related('dealer', 'created_by').prefetch_related('items__product').order_by('-created_at')
        if user.role in [UserRole.SUPER_ADMIN, UserRole.ADMIN]:
            return qs
        elif user.role == UserRole.DEALER:
            return qs.filter(dealer=user)
        else: # Distributor / Employee
            return qs.filter(created_by=user)

    def create(self, request, *args, **kwargs):
        data = request.data
        dealer_id = data.get('dealer')
        items_data = data.get('items', [])
        
        if not items_data:
            return Response({"error": "Order must have at least one item."}, status=status.HTTP_400_BAD_REQUEST)
            
        order = Order.objects.create(
            dealer_id=dealer_id,
            created_by=request.user,
            remarks=data.get('remarks', ''),
            status=OrderStatus.PENDING # Or Draft based on what frontend sends
        )
        
        subtotal = Decimal('0.00')
        gst_total = Decimal('0.00')
        grand_total = Decimal('0.00')
        
        for item in items_data:
            product = Product.objects.get(id=item['product'])
            qty = int(item['quantity'])
            
            # Use provided rate or fallback to dealer_price
            rate = Decimal(str(item.get('rate', product.dealer_price)))
            discount = Decimal(str(item.get('discount', '0.00')))
            
            # Prevent ordering if out of stock
            if product.stock < qty:
                order.delete()
                return Response({"error": f"Product {product.name} is out of stock (Available: {product.stock})."}, status=status.HTTP_400_BAD_REQUEST)
                
            base_price = rate * qty - discount
            gst = base_price * (product.gst / Decimal('100.00'))
            total = base_price + gst
            
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=qty,
                rate=rate,
                discount=discount,
                gst_percent=product.gst,
                total=total
            )
            
            subtotal += base_price
            gst_total += gst
            grand_total += total
            
        order.subtotal = subtotal
        order.gst_total = gst_total
        order.grand_total = grand_total
        order.save()
        
        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        if request.user.role not in [UserRole.SUPER_ADMIN, UserRole.ADMIN]:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
            
        order = self.get_object()
        if order.status != OrderStatus.PENDING:
            return Response({"error": "Can only approve Pending orders."}, status=status.HTTP_400_BAD_REQUEST)
            
        # Deduct inventory
        for item in order.items.all():
            product = item.product
            if product.stock < item.quantity:
                return Response({"error": f"Insufficient stock for {product.name} (Need {item.quantity}, Have {product.stock})."}, status=status.HTTP_400_BAD_REQUEST)
            product.stock -= item.quantity
            product.save()
            
        order.status = OrderStatus.APPROVED
        order.save()
        return Response({"message": "Order approved and inventory deducted."})

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        order = self.get_object()
        
        # Only dealers can cancel before approval, Admins can cancel anytime
        if request.user.role == UserRole.DEALER and order.status != OrderStatus.PENDING:
            return Response({"error": "Can only cancel pending orders."}, status=status.HTTP_400_BAD_REQUEST)
            
        if order.status in [OrderStatus.DISPATCHED, OrderStatus.DELIVERED]:
            return Response({"error": "Cannot cancel a dispatched or delivered order."}, status=status.HTTP_400_BAD_REQUEST)
            
        # If it was approved, refund inventory
        if order.status == OrderStatus.APPROVED:
            for item in order.items.all():
                product = item.product
                product.stock += item.quantity
                product.save()
                
        order.status = OrderStatus.CANCELLED
        order.save()
        return Response({"message": "Order cancelled."})

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        if request.user.role not in [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.WAREHOUSE]:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
            
        order = self.get_object()
        new_status = request.data.get('status')
        remarks = request.data.get('remarks', '')
        
        if new_status in dict(OrderStatus.choices):
            order.status = new_status
            order.save()
            
            from .models import OrderTimeline
            OrderTimeline.objects.create(
                order=order,
                status=new_status,
                remarks=remarks,
                created_by=request.user
            )
            
            return Response({"message": f"Order status updated to {new_status}."})
        return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def dispatch_details(self, request, pk=None):
        if request.user.role not in [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.WAREHOUSE]:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
            
        order = self.get_object()
        order.transport_details = request.data.get('transport_details', order.transport_details)
        order.lr_number = request.data.get('lr_number', order.lr_number)
        
        if 'lr_receipt_upload' in request.FILES:
            order.lr_receipt_upload = request.FILES['lr_receipt_upload']
            
        order.status = OrderStatus.DISPATCHED
        order.save()
        
        from .models import OrderTimeline
        OrderTimeline.objects.create(
            order=order,
            status=OrderStatus.DISPATCHED,
            remarks=f"Dispatched via {order.transport_details}. LR: {order.lr_number}",
            created_by=request.user
        )
        
        return Response({"message": "Dispatch details updated successfully."})
        
    @action(detail=True, methods=['get'])
    def timeline(self, request, pk=None):
        order = self.get_object()
        from .models import OrderTimeline
        from .serializers import OrderTimelineSerializer
        timeline = OrderTimeline.objects.filter(order=order).order_by('-created_at')
        return Response(OrderTimelineSerializer(timeline, many=True).data)

from .models import Invoice
from .serializers import InvoiceSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role in [UserRole.SUPER_ADMIN, UserRole.ADMIN]:
            return Invoice.objects.all().order_by('-created_at')
        elif user.role == UserRole.DEALER:
            return Invoice.objects.filter(order__dealer=user).order_by('-created_at')
        return Invoice.objects.none()
        
    @action(detail=True, methods=['get'])
    def generate_pdf(self, request, pk=None):
        invoice = self.get_object()
        # In a real app, you would use reportlab, weasyprint or xhtml2pdf here.
        # For now, we will return a mock URL or base64 structure.
        return Response({
            "message": "PDF generated",
            "invoice_number": invoice.invoice_number,
            "download_url": f"/media/invoices/{invoice.invoice_number}.pdf"
        })

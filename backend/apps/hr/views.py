from datetime import datetime, date
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from apps.accounts.models import UserRole
from .models import Attendance, DealerVisit, Expense, ExpenseStatus, LocationTrack, DailyTourPlan
from .serializers import AttendanceSerializer, DealerVisitSerializer, ExpenseSerializer, LocationTrackSerializer, DailyTourPlanSerializer

class LocationTrackViewSet(viewsets.ModelViewSet):
    serializer_class = LocationTrackSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role in [UserRole.SUPER_ADMIN, UserRole.ADMIN]:
            return LocationTrack.objects.all().order_by('-timestamp')
        return LocationTrack.objects.filter(employee=user).order_by('-timestamp')
        
    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)

class DailyTourPlanViewSet(viewsets.ModelViewSet):
    serializer_class = DailyTourPlanSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['status', 'date', 'employee']
    
    def get_queryset(self):
        user = self.request.user
        if user.role in [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.SALES_MANAGER]:
            return DailyTourPlan.objects.all().order_by('-date', '-created_at')
        return DailyTourPlan.objects.filter(employee=user).order_by('-date', '-created_at')
        
    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)

class HRBaseViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def initial(self, request, *args, **kwargs):
        super().initial(request, *args, **kwargs)
        if request.user.role == UserRole.DEALER:
            self.permission_denied(request, message="Dealers are not allowed to access HR modules.")

    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)

class AttendanceViewSet(HRBaseViewSet):
    serializer_class = AttendanceSerializer
    filterset_fields = ['status', 'date', 'employee']

    def get_queryset(self):
        user = self.request.user
        qs = Attendance.objects.select_related('employee').order_by('-date', '-created_at')
        if user.role in [UserRole.SUPER_ADMIN, UserRole.ADMIN]:
            return qs
        return qs.filter(employee=user)

    def create(self, request, *args, **kwargs):
        # Prevent multiple attendances for the same day for an employee
        today = date.today()
        if Attendance.objects.filter(employee=request.user, date=today).exists():
            return Response({"error": "Attendance already recorded for today."}, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)

    @action(detail=False, methods=['post'])
    def check_out(self, request):
        today = date.today()
        attendance = Attendance.objects.filter(employee=request.user, date=today).first()
        if not attendance:
            return Response({"error": "No check-in found for today."}, status=status.HTTP_400_BAD_REQUEST)
        if attendance.check_out:
            return Response({"error": "Already checked out today."}, status=status.HTTP_400_BAD_REQUEST)
        
        attendance.check_out = datetime.now().time()
        attendance.check_out_location = request.data.get('check_out_location')
        
        photo = request.data.get('check_out_photo')
        if photo:
            attendance.check_out_photo = photo
            
        # Calculate working hours
        if attendance.check_in:
            fmt = '%H:%M:%S'
            td = datetime.combine(date.today(), attendance.check_out) - datetime.combine(date.today(), attendance.check_in)
            attendance.working_hours = round(td.total_seconds() / 3600.0, 2)
            
        attendance.save()
        return Response(AttendanceSerializer(attendance).data)

class DealerVisitViewSet(HRBaseViewSet):
    serializer_class = DealerVisitSerializer
    filterset_fields = ['dealer', 'date', 'employee']

    def get_queryset(self):
        user = self.request.user
        qs = DealerVisit.objects.select_related('employee', 'dealer').order_by('-date', '-created_at')
        if user.role in [UserRole.SUPER_ADMIN, UserRole.ADMIN]:
            return qs
        return qs.filter(employee=user)

class ExpenseViewSet(HRBaseViewSet):
    serializer_class = ExpenseSerializer
    filterset_fields = ['status', 'category', 'date', 'employee']

    def get_queryset(self):
        user = self.request.user
        qs = Expense.objects.select_related('employee', 'approved_by').order_by('-date', '-created_at')
        if user.role in [UserRole.SUPER_ADMIN, UserRole.ADMIN]:
            return qs
        return qs.filter(employee=user)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        if request.user.role not in [UserRole.SUPER_ADMIN, UserRole.ADMIN]:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
            
        expense = self.get_object()
        expense.status = ExpenseStatus.APPROVED
        expense.approved_by = request.user
        expense.save()
        return Response(ExpenseSerializer(expense).data)

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        if request.user.role not in [UserRole.SUPER_ADMIN, UserRole.ADMIN]:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
            
        expense = self.get_object()
        expense.status = ExpenseStatus.REJECTED
        expense.approved_by = request.user
        expense.save()
        return Response(ExpenseSerializer(expense).data)

import os
import sys
import django

sys.path.append('backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ccs_backend.settings')
django.setup()

from apps.accounts.models import User, UserRole
from apps.products.models import Product
from apps.orders.models import Order
from apps.orders.views import OrderViewSet
from rest_framework.test import APIRequestFactory, force_authenticate

dealer = User.objects.filter(role=UserRole.DEALER).first()
product = Product.objects.first()

factory = APIRequestFactory()
request = factory.post('/api/orders/', {
    'items': [{'product': str(product.id), 'quantity': 2, 'rate': 500}],
    'remarks': 'Debug Order'
}, format='json')

force_authenticate(request, user=dealer)
view = OrderViewSet.as_view({'post': 'create'})

try:
    response = view(request)
    print("Response status:", response.status_code)
    print("Response data:", response.data)
except Exception as e:
    import traceback
    print("CRASH TRACEBACK:")
    traceback.print_exc()

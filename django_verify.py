import os
import sys
import django
from django.contrib.auth import get_user_model
from django.core.management import call_command

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ccs_backend.settings')
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
django.setup()

User = get_user_model()

print("Checking migrations...")
try:
    call_command('migrate', interactive=False)
    print("Migrations applied successfully.")
except Exception as e:
    print(f"Migration error: {e}")

print("\nChecking database connectivity...")
try:
    users_count = User.objects.count()
    print(f"Connected to DB. Total users: {users_count}")
except Exception as e:
    print(f"DB error: {e}")

print("\nCreating superuser if not exists...")
try:
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser("admin", "admin@example.com", "adminpass")
        print("Superuser created: admin / adminpass")
    else:
        print("Superuser 'admin' already exists.")
except Exception as e:
    print(f"Error creating superuser: {e}")

print("\nVerifying models and imports...")
try:
    from apps.orders.models import Order
    from apps.products.models import Product
    from apps.hr.models import Attendance
    print("Models imported successfully.")
except Exception as e:
    print(f"Model import error: {e}")

print("\nDone.")

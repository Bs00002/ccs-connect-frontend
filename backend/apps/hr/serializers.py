from rest_framework import serializers
from .models import Attendance, DealerVisit, Expense, LocationTrack, DailyTourPlan

class LocationTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationTrack
        fields = '__all__'
        read_only_fields = ('employee',)

class DailyTourPlanSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.username', read_only=True)
    manager_name = serializers.CharField(source='manager_approval.username', read_only=True)
    
    class Meta:
        model = DailyTourPlan
        fields = '__all__'
        read_only_fields = ('employee', 'status', 'manager_approval')

class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.username', read_only=True)
    
    class Meta:
        model = Attendance
        fields = '__all__'
        read_only_fields = ('employee', 'date', 'working_hours')

class DealerVisitSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.username', read_only=True)
    dealer_name = serializers.CharField(source='dealer.username', read_only=True)
    
    class Meta:
        model = DealerVisit
        fields = '__all__'
        read_only_fields = ('employee', 'date')

class ExpenseSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.username', read_only=True)
    approved_by_name = serializers.CharField(source='approved_by.username', read_only=True)
    
    class Meta:
        model = Expense
        fields = '__all__'
        read_only_fields = ('employee', 'status', 'approved_by')

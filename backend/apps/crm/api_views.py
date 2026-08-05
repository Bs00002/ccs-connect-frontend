from rest_framework import viewsets, permissions
from .models import Lead, Quotation, FollowUp
from .serializers import LeadSerializer, QuotationSerializer, FollowUpSerializer

class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all().order_by('-created_at')
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]

class QuotationViewSet(viewsets.ModelViewSet):
    queryset = Quotation.objects.all().order_by('-created_at')
    serializer_class = QuotationSerializer
    permission_classes = [permissions.IsAuthenticated]

class FollowUpViewSet(viewsets.ModelViewSet):
    queryset = FollowUp.objects.all().order_by('-followup_date')
    serializer_class = FollowUpSerializer
    permission_classes = [permissions.IsAuthenticated]

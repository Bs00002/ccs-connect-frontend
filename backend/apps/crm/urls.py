from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import LeadViewSet, QuotationViewSet, FollowUpViewSet

router = DefaultRouter()
router.register(r'leads', LeadViewSet, basename='lead')
router.register(r'quotations', QuotationViewSet, basename='quotation')
router.register(r'followups', FollowUpViewSet, basename='followup')

urlpatterns = [
    path('', include(router.urls)),
]

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from ..views import SendOTPView, RegisterView, LoginView, PublicDealerLocatorView

urlpatterns = [
    path('auth/register-init/', SendOTPView.as_view(), name='auth_register_init'),
    path('auth/register-verify/', RegisterView.as_view(), name='auth_register_verify'),
    path('auth/login/', LoginView.as_view(), name='auth_login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('public/dealers/', PublicDealerLocatorView.as_view(), name='public_dealer_locator'),
]

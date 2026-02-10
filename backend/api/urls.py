from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from .auth_views import api_login, api_logout, get_user, get_csrf_token, api_register

router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'tickets', TicketViewSet)
router.register(r'crowd', CrowdZoneViewSet)
router.register(r'energy', EnergyMeterViewSet)
router.register(r'merchandise', MerchandiseItemViewSet)
router.register(r'logs', SystemLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', api_register, name='api-register'),
    path('auth/login/', api_login, name='api-login'),
    path('auth/logout/', api_logout, name='api-logout'),
    path('auth/user/', get_user, name='get-user'),
    path('auth/csrf/', get_csrf_token, name='get-csrf'),
    path('dashboard-data', DashboardDataView.as_view(), name='dashboard-data'),
    path('validate-ticket', ValidateTicket.as_view(), name='validate-ticket'),
    path('generate-mock', GenerateMockData.as_view(), name='generate-mock'),
]

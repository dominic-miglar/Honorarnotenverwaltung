from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import RedirectView
from avocado_backend.avocado import views
import rest_framework
from rest_framework.routers import DefaultRouter

admin.autodiscover()

router = DefaultRouter(trailing_slash=True)
router.register(r'users', views.UserViewSet)
router.register(r'userprofiles', views.UserProfileViewSet)
router.register(r'customers', views.CustomerViewSet)
router.register(r'addresses', views.AddressViewSet)
router.register(r'bankaccounts', views.BankAccountViewSet)
router.register(r'invoices', views.InvoiceViewSet)
router.register(r'services', views.ServiceViewSet)
router.register(r'consumedservices', views.ConsumedServiceViewSet)

urlpatterns = patterns('',
    url(r'^$', RedirectView.as_view(url='api/v1/')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', 'rest_framework.authtoken.views.obtain_auth_token'),
    url(r'currentuser', views.CurrentUserView.as_view()),
)

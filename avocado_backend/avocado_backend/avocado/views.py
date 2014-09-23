from rest_framework import viewsets
from django.contrib.auth.models import User
from avocado_backend.avocado import models, filtersets, serializers

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = serializers.UserSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
	queryset = models.UserProfile.objects.all()
	serializer_class = serializers.UserProfileSerializer
	filter_class = filtersets.UserProfileFilter

class CustomerViewSet(viewsets.ModelViewSet):
	queryset = models.Customer.objects.all()
	serializer_class = serializers.CustomerSerializer
	filter_class = filtersets.CustomerFilter

class AddressViewSet(viewsets.ModelViewSet):
	queryset = models.Address.objects.all()
	serializer_class = serializers.AddressSerializer
	filter_class = filtersets.AddressFilter

class BankAccountViewSet(viewsets.ModelViewSet):
	queryset = models.BankAccount.objects.all()
	serializer_class = serializers.BankAccountSerializer
	filter_class = filtersets.BankAccountFilter

class InvoiceViewSet(viewsets.ModelViewSet):
	queryset = models.Invoice.objects.all()
	serializer_class = serializers.InvoiceSerializer
	filter_class = filtersets.InvoiceFilter

class ServiceViewSet(viewsets.ModelViewSet):
	queryset = models.Service.objects.all()
	serializer_class = serializers.ServiceSerializer
	filter_class = filtersets.ServiceFilter

class ConsumedServiceViewSet(viewsets.ModelViewSet):
	queryset = models.ConsumedService.objects.all()
	serializer_class = serializers.ConsumedServiceSerializer
	filter_class = filtersets.ConsumedServiceFilter

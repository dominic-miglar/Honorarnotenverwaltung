from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework import serializers
from avocado_backend.avocado import models

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = get_user_model()
        #model = User

class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.UserProfile
        fields = ('id', 'user', 'address', 'bank_account', 'uid', 'last_name', 'first_name', 'telephone_number', 'mobile_phone_number')
        read_only_fields = []

class AddressSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Address
        fields = ('id', 'street_address', 'postal_code', 'town', 'country',)
        read_only_fields = []

class BankAccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.BankAccount
        fields = ('id', 'iban', 'bic',)
        read_only_fields = []

class InvoiceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Invoice
        fields = ('id', 'issuer', 'customer', 'exhibition_date', 'delivery_date', 'vat_type', 'status',)
        read_only_fields = []

class ServiceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Service
        fields = ('id', 'name', 'description', 'billing_type', 'cost',)
        read_only_fields = []

class ConsumedServiceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.ConsumedService
        fields = ('id', 'service', 'invoice', 'consumed', 'date_consumed')
        read_only_fields = []

class CustomerSerializer(serializers.HyperlinkedModelSerializer):
    bank_account = BankAccountSerializer(required=False)
    address = AddressSerializer()
    class Meta:
        model = models.Customer
        fields = ('id', 'address', 'bank_account', 'last_name', 'first_name', 'birthdate', 'email', 'telephone_number', 'mobile_phone_number', 'recommended_from', 'date_created',)
        read_only_fields = []

from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework import serializers
from avocado_backend.avocado import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        #model = User

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Address
        fields = ('id', 'street_address', 'postal_code', 'town', 'country',)
        read_only_fields = []

class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BankAccount
        fields = ('id', 'iban', 'bic',)
        read_only_fields = []

class UserProfileSerializer(serializers.ModelSerializer):
    bank_account = BankAccountSerializer(required=False)
    address = AddressSerializer()
    class Meta:
        model = models.UserProfile
        fields = ('id', 'user', 'address', 'bank_account', 'uid', 'last_name', 'first_name', 'telephone_number', 'mobile_phone_number')
        read_only_fields = []

# Serializer for Customer 

class CustomerSerializer(serializers.ModelSerializer):
    bank_account = BankAccountSerializer(required=False)
    address = AddressSerializer()
    class Meta:
        model = models.Customer
        fields = ('id', 'address', 'bank_account', 'last_name', 'first_name', 'birthdate', 'email', 'telephone_number', 'mobile_phone_number', 'recommended_from', 'date_created', 'is_vat_exempt',)
        read_only_fields = []

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Invoice
        fields = ('id', 'issuer', 'customer', 'exhibition_date', 'delivery_date', 'status',)
        read_only_fields = []

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Service
        fields = ('id', 'name', 'description', 'billing_type', 'cost', 'vat_type',)
        read_only_fields = []

# Serializers for Consumed Services view

'''
class ConsumedServiceServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Service
        fields = ('id', 'name', 'billing_type', 'cost',)
        read_only_fields = ['id', 'name', 'billing_type', 'cost',]

class ConsumedServiceCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ('id', 'last_name', 'first_name',)
        read_only_fields = ['id', 'last_name', 'first_name',]

class ConsumedServiceInvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Invoice
        fields = ('id', 'exhibition_date',)
        read_only_fields = ['id', 'exhibition_date',]
'''

class ConsumedServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ConsumedService
        fields = ('id', 'consumed', 'date_consumed', 'customer', 'service', 'invoice')
        read_only_fields = []



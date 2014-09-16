from rest_framework import serializers
from avocado_backend.avocado import models

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserProfile
        fields = ('id', 'user', 'address', 'bank_account', 'uid', 'last_name', 'first_name', 'telephone_number',)
        read_only_fields = []

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ('id', 'address', 'bank_account', 'last_name', 'first_name', 'email', 'telephone_number',)
        read_only_fields = []

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

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Invoice
        fields = ('id', 'issuer', 'customer', 'exhibition_date', 'delivery_date', 'vat_type',)
        read_only_fields = []

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Service
        fields = ('id', 'name', 'description', 'billing_type', 'cost',)
        read_only_fields = []

class ConsumedServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ConsumedService
        fields = ('id', 'service', 'invoice', 'consumed',)
        read_only_fields = []

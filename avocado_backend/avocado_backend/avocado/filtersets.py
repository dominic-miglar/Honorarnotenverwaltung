import django_filters
from avocado_backend.avocado import models

class UserProfileFilter(django_filters.FilterSet):
    class Meta:
        model = models.UserProfile
        fields = [
            'id', 'user', 'address', 'bank_account', 'uid', 'last_name', 'first_name', 
            'telephone_number', 'mobile_phone_number',
        ]

class CustomerFilter(django_filters.FilterSet):
    class Meta:
        model = models.Customer
        fields = [
            'id', 'address', 'bank_account', 'last_name', 'first_name', 'email', 
            'telephone_number', 'mobile_phone_number', 'recommended_from', 'date_created',
        ]

class AddressFilter(django_filters.FilterSet):
    class Meta:
        model = models.Address
        fields = ['id', 'country', 'town', 'postal_code', 'street_address',]

class BankAccountFilter(django_filters.FilterSet):
    class Meta:
        model = models.BankAccount
        fields = ['id', 'iban', 'bic',]

class InvoiceFilter(django_filters.FilterSet):
    date_from = django_filters.filters.DateFilter(name='exhibition_date', lookup_type='gte')
    date_to = django_filters.filters.DateFilter(name='exhibition_date', lookup_type='lt')
    class Meta:
        model = models.Invoice
        fields = ['id', 'date_from', 'date_to', 'issuer', 'customer', 'delivery_date', 'vat_type', 'status',]

class ServiceFilter(django_filters.FilterSet):
    class Meta:
        model = models.Service
        fields = ['id', 'name', 'description', 'billing_type', 'cost',]

class ConsumedServiceFilter(django_filters.FilterSet):
    class Meta:
        model = models.ConsumedService
        fields = ['id', 'service', 'invoice', 'consumed', 'date_consumed']


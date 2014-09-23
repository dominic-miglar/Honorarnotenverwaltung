from django.contrib import admin
from avocado_backend.avocado.models import *

# UserProfile
# Customer
# Address
# BankAccount
# Invoice
# Service
# ConsumedService

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    pass

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    pass

@admin.register(BankAccount)
class BankAccountAdmin(admin.ModelAdmin):
    pass

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    pass

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    pass

@admin.register(ConsumedService)
class ConsumedServiceAdmin(admin.ModelAdmin):
    pass

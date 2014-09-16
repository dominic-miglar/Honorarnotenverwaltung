from django.db import models

# Create your models here.

class UserProfile(models.Model):
    # user = Django Auth User
    address = models.ForeignKey('Address', null=True, blank=True)
    bank_account = models.ForeignKey('BankAccount', null=True, blank=True)
    uid = models.CharField('UID', max_length=255, null=True, blank=True)
    last_name = models.CharField('Lastname', max_length=255, null=True, blank=True)
    first_name = models.CharField('Firstname', max_length=255, null=True, blank=True)
    telephone_number = Models.CharField('Telephone Number', max_length=255, null=True, blank=True)

class Customer(models.Model):
    address = models.ForeignKey('Address', null=True, blank=True)
    bank_account = models.ForeignKey('BankAccount', null=True, blank=True)
    last_name = models.CharField('Lastname', max_length=255, null=True, blank=True)
    first_name = models.CharField('Firstname', max_length=255, null=True, blank=True)
    email = models.EmailField('E-Mail Address', max_length=75, null=True, blank=True)
    telephone = models.CharField('Telephone Number', max_length=255, null=True, blank=True)

class Address(models.Model):
    street_address = models.CharField('Street', max_length=255, null=True, blank=True)
    postal_code = models.CharField('Postal Code', max_length=255, null=True, blank=True)
    country = models.CharField('Country', max_length=255, null=True, blank=True)

class BankAccount(models.Model):
    iban = models.CharField('IBAN', max_length=255, null=True, blank=True)
    bic = models.CharField('BIC', max_length=255, null=True, blank=True)

class Invoice(models.Model):
    services = models.OneToMany('ConsumedService')
    # Ausstellungsdatum
    exhibition_date = models.DateTimeField('Exhibition Date', auto_add_now=True)
    # Ein Lieferungs- bzw. Leistungsdatum bzw. einen passenden Zeitraum der Leistung
    delivery_date = models.DateTimeField('Delivery Date')
    # Umsatzsteuerarten
    SUBJECT_TO_VAT = 'STVAT'
    VAT_EXEMPT = 'VATEX'
    PHONY_VAT_EXEMPT = 'PVATE'
    VAT_CHOICES = (
        (SUBJECT_TO_VAT, 'Subject to VAT'),     # Umsatzsteuerpflichtig
        (VAT_EXEMPT, 'VAT exempt'),             # Umsatzsteuerbefreit
        (PHONY_VAT_EXEMPT, 'Phony VAT exempt'), # Unecht Umsatzsteuerbefreit
    )
    vat_type = models.CharField(max_length=5, choices=VAT_CHOICES, default=SUBJECT_TO_VAT)
    hours = None


class Service(models.Model):
    # link to userprofile - user which provides / provided this service
    # customer id - customer which consumed this service
    name = models.CharField('Service Name', max_length=255, null=True, blank=True)
    description = models.CharField('Service Description', max_length=255, null=True, blank=True)
    FLAT_RATE_BILLING = 'FR'
    HOURLY_RATE_BILLING = 'HR'
    BILLING_TYPE_CHOICES = (
        (FLAT_RATE_BILLING, 'Flat Rate'),
        (HOURLY_RATE_BILLING, 'Hourly Rate'),
    )
    billing_type = models.CharField(max_length=2, choices=BILLING_TYPE_CHOICES, default=HOURLY_RATE_BILLING)
    stundensatz = None
    pauschalpreis = None


class ConsumedService(models.Model):
    service = models.ForeignKey('Service')
    consumed = models.FloatField('Hours consumed', null=True, blank=True)
    # if service is flat rate set this to 1 automatically


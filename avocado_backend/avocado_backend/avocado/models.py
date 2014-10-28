from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    address = models.ForeignKey('Address', null=True, blank=True)
    bank_account = models.ForeignKey('BankAccount', null=True, blank=True)
    uid = models.CharField('UID', max_length=255, null=True, blank=True)
    last_name = models.CharField('Last Name', max_length=255)
    first_name = models.CharField('First Name', max_length=255)
    telephone_number = models.CharField('Telephone Number', max_length=255, null=True, blank=True)
    mobile_phone_number = models.CharField('Mobile Phone Number', max_length=255, null=True, blank=True)

    def __str__(self):
        return '{0} {1}'.format(self.last_name.upper(), self.first_name)

    class Meta:
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'


class Customer(models.Model):
    address = models.ForeignKey('Address', null=True, blank=True)
    bank_account = models.ForeignKey('BankAccount', null=True, blank=True)
    last_name = models.CharField('Last Name', max_length=255)
    first_name = models.CharField('First Name', max_length=255)
    birthdate = models.DateTimeField('Birthdate', null=True, blank=True)
    email = models.CharField('E-Mail Address', max_length=75, null=True, blank=True)
    telephone_number = models.CharField('Telephone Number', max_length=255, null=True, blank=True)
    mobile_phone_number = models.CharField('Mobile Phone Number', max_length=255, null=True, blank=True)
    recommended_from = models.CharField('Recommended from', max_length=255, null=True, blank=True)
    date_created = models.DateTimeField('Creation Date', auto_now_add=True)

    def __str__(self):
        retval = '{0} {1}'.format(self.last_name.upper(), self.first_name)
        if self.address:
            retval += ' - {0} {1} {2}, {3}'.format(
                self.address.country,
                self.address.postal_code, 
                self.address.town, 
                self.address.street_address)
        return retval

    class Meta:
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'


class Address(models.Model):
    street_address = models.CharField('Street', max_length=255)
    postal_code = models.CharField('Postal Code', max_length=255)
    town = models.CharField('Town', max_length=255)
    country = models.CharField('Country', max_length=255)

    def __str__(self):
        return '{0} {1} {2}, {3}'.format(
            self.country,
            self.postal_code,
            self.town,
            self.street_address)

    class Meta:
        verbose_name = 'Address'
        verbose_name_plural = 'Addresses'


class BankAccount(models.Model):
    iban = models.CharField('IBAN', max_length=255)
    bic = models.CharField('BIC', max_length=255, null=True, blank=True)

    def __str__(self):
        retval = '{0}'.format(self.iban)
        if self.bic:
            retval += ' - {0}'.format(self.bic)
        return retval

    class Meta:
        verbose_name = 'Bank Account'
        verbose_name_plural = 'Bank Accounts'


class Invoice(models.Model):
    issuer = models.ForeignKey('UserProfile')
    customer = models.ForeignKey('Customer')
    #services = models.OneToMany('ConsumedService')
    exhibition_date = models.DateTimeField('Exhibition Date', auto_now_add=True)
    delivery_date = models.DateTimeField('Delivery Date', auto_now_add=True)
    SUBJECT_TO_VAT = 'STVAT'
    VAT_EXEMPT = 'VATEX'
    PHONY_VAT_EXEMPT = 'PVATE'
    VAT_CHOICES = (
        (SUBJECT_TO_VAT, 'Subject to VAT'),     # Umsatzsteuerpflichtig
        (VAT_EXEMPT, 'VAT exempt'),             # Umsatzsteuerbefreit
        (PHONY_VAT_EXEMPT, 'Phony VAT exempt'), # Unecht Umsatzsteuerbefreit
    )
    vat_type = models.CharField(
        'VAT Type', max_length=5, choices=VAT_CHOICES, default=SUBJECT_TO_VAT)

    OPEN = 'OPN'
    CREATED = 'CRE'
    CANCELED = 'CAN'
    PAID = 'PAD'
    STATUS_CHOICES = (
        (OPEN, 'Invoice is open for payment'),     # Bestellung abgesendet. Warte auf Bezahlung
        (CREATED, 'Invoice created. Editing allowed'),             # Bestellung erstellt und noch editierbar
        (CANCELED, 'Invoice canceled'), # Bestellung storniert
        (PAID, 'Invoice '), # Bestellung bezahlt
    )
    status = models.CharField(
        'Status', max_length=5, choices=STATUS_CHOICES, default=CREATED)

    def __str__(self):
        return '{0} - {1} - {2}'.format(self.id, self.exhibition_date, self.vat_type)

    class Meta:
        verbose_name = 'Invoice'
        verbose_name_plural = 'Invoices'


class Service(models.Model):
    name = models.CharField('Service Name', max_length=255)
    description = models.CharField('Service Description', max_length=255)
    FLAT_RATE_BILLING = 'FR'
    HOURLY_RATE_BILLING = 'HR'
    BILLING_TYPE_CHOICES = (
        (FLAT_RATE_BILLING, 'Flat Rate'),
        (HOURLY_RATE_BILLING, 'Hourly Rate'),
    )
    billing_type = models.CharField('Billing Type', max_length=2, choices=BILLING_TYPE_CHOICES, default=HOURLY_RATE_BILLING)
    cost = models.FloatField('Cost')

    def __str__(self):
        return '{0} - {1} {2}'.format(self.name, str(self.cost), self.billing_type)

    class Meta:
        verbose_name = 'Service'
        verbose_name_plural = 'Services'


class ConsumedService(models.Model):
    service = models.ForeignKey('Service')
    customer = models.ForeignKey('Customer')    
    invoice = models.ForeignKey('Invoice', null=True, blank=True)
    consumed = models.FloatField('Hours consumed', null=True, blank=True)
    date_consumed = models.DateTimeField('Date consumed', null=True, blank=True)

    def save(self, *args, **kwargs):
        if(self.service.billing_type == self.service.FLAT_RATE_BILLING or not self.consumed):
            self.consumed = 1
        super(ConsumedService, self).save(*args, **kwargs)

    def __str__(self):
        return '{0} {1}h - {2}'.format(self.service.name, self.consumed, self.invoice.id)

    class Meta:
        verbose_name = 'Consumed Service'
        verbose_name_plural = 'Consumed Services'


import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'avocado_backend.settings')
django.setup()

from django.contrib.auth.models import User
from avocado_backend.avocado.models import *

def create_sample_user_data():
	# Create sample Djanto Users (contrib.Auth)
	user_hugo = User.objects.create_user('hugo', None, 'hugo')
	user_hugo.is_staff = True
	user_hugo.save()

	user_mongo = User.objects.create_user('mongo', None, 'mongo')
	user_mongo.is_staff = True
	user_mongo.save()

	user_goofy = User.objects.create_user('goofy', None, 'goofy')
	user_goofy.is_staff = False
	user_goofy.save()

	# Create Sample Bank Accounts
	bank_hugo = BankAccount.objects.create(iban='AT1111', bic='ASDF')
	bank_mongo = BankAccount.objects.create(iban='DE2222', bic='FGHJ')
	bank_goofy = BankAccount.objects.create(iban='CH3333', bic='NBVC')
	bank_herbert = BankAccount.objects.create(iban='DE11411', bic='AGDF')
	bank_sepp = BankAccount.objects.create(iban='DE1211', bic='AEDF')
	bank_hauns = BankAccount.objects.create(iban='US124111', bic='ANDF')
	bank_fraunz = BankAccount.objects.create(iban='IT1167', bic='AQDF')

	# Create Sample Addresses
	address_hugo = Address.objects.create(
		street_address='Holzstrasse 12',
		postal_code='1234',
		town='Musterstadt',
		country='Oesterreich'
	)
	address_mongo = Address.objects.create(
		street_address='Bahnhofstrasse 1',
		postal_code='2345',
		town='Bahnhofstadt',
		country='Deutschland'
	)
	address_goofy = Address.objects.create(
		street_address='Ricolaweg 3a',
		postal_code='4432',
		town='Burgstadt',
		country='Schweiz'
	)
	address_herbert = Address.objects.create(
		street_address='Tranglastrossn 2a',
		postal_code='41232',
		town='Burghof',
		country='Deutschland'
	)
	address_sepp = Address.objects.create(
		street_address='Hollatrio',
		postal_code='4431',
		town='Heldenstadt',
		country='Deutschland'
	)
	address_hauns = Address.objects.create(
		street_address='Maoamweg 5c',
		postal_code='5521',
		town='Sweettown',
		country='USA'
	)
	address_fraunz = Address.objects.create(
		street_address='Unzweg 33',
		postal_code='44532',
		town='Unzstadt',
		country='Italien'
	)

	
	# Create Sample UserProfiles
	userprofile_hugo = UserProfile.objects.create(
		user=user_hugo,
		address=address_hugo,
		bank_account=bank_hugo,
		uid='UID223432',
		last_name='Hugo',
		first_name='Oguh',
		telephone_number='+436601234567',
        mobile_phone_number='+436605498711',
        email='hugo@hugo.com'
	)
	userprofile_mongo = UserProfile.objects.create(
		user=user_mongo,
		address=address_mongo,
		bank_account=bank_mongo,
		uid='UID223382',
		last_name='Mongo',
		first_name='Ognom',
		telephone_number='+436607654321',
		email='mongo@mongo.com'
	)
	userprofile_goofy = UserProfile.objects.create(
		user=user_goofy,
		address=address_goofy,
		bank_account=bank_goofy,
		uid='UID229381',
		last_name='Goofy',
		first_name='Yfoog',
		telephone_number='+436601229667',
		email='goofy@goofy.com'
	)

	# Create Sample Customers
	customer_herbert = Customer.objects.create(
		address=address_herbert,
		bank_account=bank_herbert,
		first_name='Herbert',
		last_name='Trebreh',
		email='herbert@localhost.localdomain',
		telephone_number='+436641234567'
	)
	customer_sepp = Customer.objects.create(
		address=address_sepp,
		bank_account=bank_sepp,
		first_name='Sepp',
		last_name='Ppes',
		email='sepp@localhost.localdomain',
		telephone_number='+436647654321'
	)
	customer_hauns = Customer.objects.create(
		address=address_hauns,
		bank_account=bank_hauns,
		first_name='Hauns',
		last_name='Snuah',
		email='hauns@localhost.localdomain',
		telephone_number='+436761234567'
	)
	customer_fraunz = Customer.objects.create(
		address=address_fraunz,
		bank_account=bank_fraunz,
		first_name='Fraunz',
		last_name='Znuarf',
		email='fraunz@localhost.localdomain',
		telephone_number='+436767654321'
	)

	# Create Sample Services
	service_beratung = Service.objects.create(
		name='Beratung',
		description='Beratung for dummies',
		billing_type=Service.FLAT_RATE_BILLING,
		cost=2000
	)
	service_edv = Service.objects.create(
		name='Wartung des EDV-Systems',
		description='Wartung eines gesamten EDV Systems',
		billing_type=Service.HOURLY_RATE_BILLING,
		cost=80
	)
	service_cleaning = Service.objects.create(
		name='Saeubern des Klassenzimmers',
		description='Klassenordner saeubert das Klassenzimmer',
		billing_type=Service.HOURLY_RATE_BILLING,
		cost=2
	)

	# Create Sample Invoice for Customer Herbert with Account Mongo
	invoice_herbert = Invoice()
	invoice_herbert.issuer = userprofile_mongo
	invoice_herbert.customer = customer_herbert
	invoice_herbert.save()

	# Consume Services and link it to the just created Invoice
	consumed_beratung = ConsumedService.objects.create(
		service=service_beratung,
		invoice=invoice_herbert,
                customer=customer_herbert
	)
	consumed_edv = ConsumedService.objects.create(
		service=service_edv,
		invoice=invoice_herbert,
		consumed=8,
                customer=customer_herbert
	)
	consumed_cleaning = ConsumedService.objects.create(
		service=service_cleaning,
		invoice=invoice_herbert,
		consumed=3,
                customer=customer_herbert
	)


if __name__ == '__main__':
	print('Creating Sample User Data...')
	create_sample_user_data()


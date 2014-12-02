import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'avocado_backend.settings')
django.setup()

from django.contrib.auth.models import User
from avocado_backend.avocado.models import *

def create_user(username, email, password, firstname, lastname):
    new_user = User.objects.create_user(username, email, password)
    new_user.is_staff = True
    new_user.save()

    new_userprofile_hugo = UserProfile.objects.create(
        user=new_user,
        last_name=lastname,
        email=email,
        first_name=firstname,
    )

if __name__ == '__main__':
    print('Creating User...')
    if len(sys.argv) < 6:
        sys.exit(-1)
    username = sys.argv[1]
    email = sys.argv[2]
    password = sys.argv[3]
    firstname = sys.argv[4]
    lastname = sys.argv[5]
    create_user(username=username, email=email, password=password, firstname=firstname, lastname=lastname)
    sys.exit(0)


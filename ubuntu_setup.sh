#!/bin/bash

# Setup script, Ubuntu 14.04 Server amd64

AVOCADO_USER="avocado"
AVOCADO_BACKEND_IP="192.168.78.128"
AVOCADO_BACKEND_PORT="8000"

AVOCADO_NEW_USER_NAME="myuser"
AVOCADO_NEW_USER_EMAIL="myuser@gmail.com"
AVOCADO_NEW_USER_PASSWORD="myuserpassword"
AVOCADO_NEW_USER_FIRSTNAME="User"
AVOCADO_NEW_USER_LASTNAME="My"

set_up()
{
    avocado_setup_init
    #install_apt_dependencies
    create_user
    clone_git_repository
    configure_apache
    prepare_virtualenv
    prepare_backend
    configure_frontend
}

clean_up()
{
    echo "Cleaning up..."
    sudo rm -rf /home/avocado/
    sudo userdel avocado
}

run_backend_server()
{
    echo "Backend server is starting on http://$AVOCADO_BACKEND_IP:$AVOCADO_BACKEND_PORT/"
    echo ""
    start_backend_server
}

avocado_setup_init()
{
    set -e
}

# For later: To fill variables with data, stop using constants like above
introduction_welcome()
{
    clear
    echo "Welcome to the avocado setup!"
    echo ""
    echo "What's your name?: "
    read name
    echo ""
    echo "Hello $name!"
    echo ""
    echo "Which password should we set for your new account?"
    read -s password 
    echo ""
    echo "We're setting up the software.. Please wait.."
    echo ""
}

create_user()
{
    clear
    echo "Creating User $AVOCADO_USER ..."
    id -u $AVOCADO_USER &>/dev/null || sudo useradd -m $AVOCADO_USER
}

install_apt_dependencies()
{
    clear
    echo "Installing packages..."
    sudo apt-get update
    sudo apt-get install python3 apache2 git python-virtualenv
}

configure_apache()
{
    clear
    echo "Copying apache configuration files..."
    sudo cp avocado_apache.conf /etc/apache2/conf-enabled/avocado.conf
    echo "Restarting apache2 server..."
    sudo service apache2 restart
}

clone_git_repository() 
{
    clear
    echo "Cloning git repository..."
    sudo -u $AVOCADO_USER git clone https://gitlab.htl-villach.at/dominic.miglar/honorarnotenverwaltung-avocado.git /home/$AVOCADO_USER/avocado
}

prepare_virtualenv()
{
    clear
    echo "Creating virtual python3 environment..."
    sudo -u $AVOCADO_USER virtualenv -p /usr/bin/python3 /home/$AVOCADO_USER/virtualenv
    echo "Installing python3 dependencies..."
    sudo -u $AVOCADO_USER /home/$AVOCADO_USER/virtualenv/bin/pip install django djangorestframework markdown django-filter django-cors-headers
}

prepare_backend()
{
    clear
    echo "Preparing Avocado Backend..."
    sudo -u $AVOCADO_USER /home/$AVOCADO_USER/virtualenv/bin/python3 /home/$AVOCADO_USER/avocado/avocado_backend/manage.py syncdb --noinput
    clear
    echo "Please provide a admin username and password:"
    sudo -u $AVOCADO_USER /home/$AVOCADO_USER/virtualenv/bin/python3 /home/$AVOCADO_USER/avocado/avocado_backend/manage.py createsuperuser
    echo "Creating new user..."
    create_new_user
}

start_backend_server()
{
    sudo -u $AVOCADO_USER /home/$AVOCADO_USER/virtualenv/bin/python3 /home/$AVOCADO_USER/avocado/avocado_backend/manage.py runserver $AVOCADO_BACKEND_IP:$AVOCADO_BACKEND_PORT
}

configure_frontend()
{
    sudo -u $AVOCADO_USER sed -i "s/var apiServer.*/var apiServer = 'http:\/\/$AVOCADO_BACKEND_IP:$AVOCADO_BACKEND_PORT\/';/g" /home/$AVOCADO_USER/avocado/avocado_frontend/scripts/conf.js
}

create_new_user()
{
    sudo -u $AVOCADO_USER /home/$AVOCADO_USER/virtualenv/bin/python3 /home/$AVOCADO_USER/avocado/avocado_backend/create_user.py $AVOCADO_NEW_USER_NAME $AVOCADO_NEW_USER_EMAIL $AVOCADO_NEW_USER_PASSWORD $AVOCADO_NEW_USER_FIRSTNAME $AVOCADO_NEW_USER_LASTNAME
}


clean_up
set_up
run_backend_server


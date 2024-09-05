#!/bin/bash

mkdir -p /home/$1/jail/commands
chown $1:$1 /home/$1/jail/commands
chmod 700 /home/$1/jail/commands

mkdir -p /home/$1/jail/done
chown $1:$1 /home/$1/jail/done
chmod 700 /home/$1/jail/done

mkdir -p /home/$1/jail/images
chown $1:$1 /home/$1/jail/images
chmod 700 /home/$1/jail/images

./update.sh $1
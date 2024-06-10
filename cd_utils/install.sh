#!/bin/bash

mkdir -p /home/$1/jail/pending
chown $1:$1 /home/$1/jail/pending
chmod 700 /home/$1/jail/pending

mkdir -p /home/$1/jail/done
chown $1:$1 /home/$1/jail/done
chmod 700 /home/$1/jail/done

mkdir -p /home/$1/jail/images
chown $1:$1 /home/$1/jail/images
chmod 700 /home/$1/jail/images

chmod 700 sbin/*
cp -r sbin/* /usr/local/sbin

chmod 755 bin/*
cp -r bin/* /usr/local/bin

cp -r service/systemctl/$1/* /home/$1/.config/systemd/user/
cp -r service/systemctl/root/* /lib/systemd/system/

systemctl daemon-reload
systemctl enable adlamin-socket

systemctl --user-unit=$1 daemon-reload
systemctl --user-unit=$1 enable run-pending-deploys
systemctl --user-unit=$1 enable run-pending-deploys.timer
systemctl --user-unit=$1 enable load-docker-images
systemctl --user-unit=$1 enable load-docker-images.timer
systemctl --user-unit=$1 enable expire-clients
systemctl --user-unit=$1 enable expire-clients.timer
systemctl --user-unit=$1 enable adlamin-initialize
systemctl --user-unit=$1 enable adlamin-cleanup
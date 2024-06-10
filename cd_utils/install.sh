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

systemctl -M $1@ --user daemon-reload
systemctl -M $1@ --user enable run-pending-deploys
systemctl -M $1@ --user enable run-pending-deploys.timer
systemctl -M $1@ --user enable load-docker-images
systemctl -M $1@ --user enable load-docker-images.timer
systemctl -M $1@ --user enable expire-clients
systemctl -M $1@ --user enable expire-clients.timer
systemctl -M $1@ --user enable adlamin-initialize
systemctl -M $1@ --user enable adlamin-cleanup
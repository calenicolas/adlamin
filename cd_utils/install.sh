#!/bin/bash

mkdir /home/deploy/jail/pending
chown deploy:deploy /home/deploy/jail/pending
chmod 700 /home/deploy/jail/pending

mkdir /home/deploy/jail/done
chown deploy:deploy /home/deploy/jail/done
chmod 700 /home/deploy/jail/done

mkdir /home/deploy/jail/images
chown deploy:deploy /home/deploy/jail/images
chmod 700 /home/deploy/jail/images

chmod 700 sbin/*
cp -r sbin/* /usr/local/sbin

chmod 755 bin/*
cp -r bin/* /usr/local/bin

cp -r service/systemctl/* /lib/systemd/system

systemctl daemon-reload
systemctl enable run-pending-deploys
systemctl enable run-pending-deploys.timer
systemctl enable load-docker-images
systemctl enable load-docker-images.timer
systemctl enable expire-clients
systemctl enable expire-clients.timer
systemctl enable adlamin-initialize
systemctl enable adlamin-cleanup
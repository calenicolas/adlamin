#!/bin/bash

mkdir /home/deploy/pending
chown deploy:deploy /home/deploy/pending
chmod 644 /home/deploy/pending

mkdir /home/deploy/done
chown deploy:deploy /home/deploy/done
chmod 644 /home/deploy/done

chmod 700 sbin/*
cp -r sbin/* /usr/local/sbin

chmod 755 bin/*
cp -r bin/* /usr/local/bin

cp -r service/systemctl/* /lib/systemd/system

systemctl daemon-reload
systemctl enable run-pending-deploys
systemctl enable run-pending-deploys.timer
systemctl enable expire-clients
systemctl enable expire-clients.timer
systemctl enable adlamin-initialize
systemctl enable adlamin-cleanup
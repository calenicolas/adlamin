#!/bin/bash

chmod +x sbin/*
cp -r sbin/* /usr/local/sbin

cp -r service/systemctl/* /lib/systemd/system

docker build -t deploy-service service/docker

systemctl daemon-reload
systemctl enable run-pending-deploys
systemctl enable run-pending-deploys.timer
systemctl enable expire-clients
systemctl enable expire-clients.timer
systemctl enable adlamin-initialize
systemctl enable adlamin-cleanup
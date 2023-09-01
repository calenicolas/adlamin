#!/bin/bash

cp -r sbin/* /usr/local/sbin
mkdir /usr/local/lib/cd_utils || true
cp -r lib/* /usr/local/lib/cd_utils

cp root/* /root/

cp -r service/systemctl/* /lib/systemd/system

docker build -t deploy-service service/docker

systemctl daemon-reload
systemctl enable run-pending-deploys
systemctl enable run-pending-deploys.timer
systemctl enable cd-default-infrastructure
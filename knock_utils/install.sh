#!/bin/bash

mkdir /usr/local/lib/knock_utils
cp -r lib/* /usr/local/lib/knock_utils
cp -r root/* /root/

cp -r service/systemctl/* /lib/systemd/system
systemctl daemon-reload
systemctl enable knock-restore-rules
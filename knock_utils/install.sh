#!/bin/bash

cp -r root/* /root/

cp -r service/systemctl/* /lib/systemd/system
systemctl daemon-reload
systemctl enable knock-restore-rules
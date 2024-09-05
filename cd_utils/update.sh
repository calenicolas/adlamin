#!/bin/bash

chmod 700 sbin/*
cp -r sbin/* /usr/local/sbin

chmod 755 bin/*
cp -r bin/* /usr/local/bin

cp -r service/systemctl/$1/* /home/$1/.config/systemd/user/
cp -r service/systemctl/root/* /lib/systemd/system/

systemctl daemon-reload
systemctl enable adlamin-socket

systemctl -M $1@ --user daemon-reload
systemctl -M $1@ --user enable run-pending-commands
systemctl -M $1@ --user enable run-pending-commands.timer
systemctl -M $1@ --user enable auto-scale
systemctl -M $1@ --user enable auto-scale.timer
systemctl -M $1@ --user enable expire-clients
systemctl -M $1@ --user enable expire-clients.timer
systemctl -M $1@ --user enable adlamin-start_up
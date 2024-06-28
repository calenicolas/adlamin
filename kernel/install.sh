#!/bin/bash

mkdir -p /etc/adlamin/configuration/nginx
cp configuration.json /etc/adlamin
cp configuration/* /etc/adlamin/configuration

mkdir -p /home/deploy/.config/systemd/user/docker.service.d
cp ./override.conf /home/deploy/.config/systemd/user/docker.service.d
chmod 644 /home/deploy/.config/systemd/user/docker.service.d/override.conf

echo "building adlamin-nginx image..."
docker -H $1 build -t adlamin-nginx ./docker/nginx
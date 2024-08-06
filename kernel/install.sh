#!/bin/bash

cp configuration.json /etc/adlamin

mkdir -p /home/deploy/.config/systemd/user/docker.service.d
cp ./override.conf /home/deploy/.config/systemd/user/docker.service.d
chmod 644 /home/deploy/.config/systemd/user/docker.service.d/override.conf

echo "building adlamin-nginx image..."
docker -H $1 build -t adlamin-nginx ./docker/nginx
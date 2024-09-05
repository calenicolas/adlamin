#!/bin/bash

cp ./override.conf /home/deploy/.config/systemd/user/docker.service.d
chmod 644 /home/deploy/.config/systemd/user/docker.service.d/override.conf

cp configuration.json /etc/adlamin

echo "building adlamin-nginx image..."
docker -H $1 build -t adlamin-nginx ./docker/nginx

echo "building adlamin-stats image..."
docker -H $1 build -t adlamin-stats ./docker/stats
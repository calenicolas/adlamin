#!/bin/bash

mkdir -p /etc/adlamin/configuration/nginx
cp configuration.json /etc/adlamin
cp configuration/* /etc/adlamin/configuration

echo "building adlamin-nginx image..."
su -c "docker build -t adlamin-nginx ./docker/nginx" $1
#!/bin/bash

mkdir -p /etc/adlamin/configuration/nginx
cp configuration.json /etc/adlamin
cp configuration/* /etc/adlamin/configuration

echo "building adlamin-nginx image..."
docker build -t adlamin-nginx ./docker/nginx
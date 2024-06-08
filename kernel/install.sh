#!/bin/bash

mkdir -p /etc/adlamin/configuration/nginx
cp configuration.json /etc/adlamin
cp configuration/* /etc/adlamin/configuration

echo "building adlamin-nginx image..."
if ! docker -H $1 build -t adlamin-nginx ./docker/nginx ; then
  exit 2
fi
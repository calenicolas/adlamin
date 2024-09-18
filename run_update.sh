#!/bin/bash

read -p "Docker socket: [unix:///run/user/1001/docker.sock] " DOCKER_SOCKET
DOCKER_SOCKET=${DOCKER_SOCKET:-"unix:///run/user/1001/docker.sock"}

read -p "Docker user: [deploy] " DOCKER_USER
DOCKER_USER=${DOCKER_USER:-"deploy"}

systemctl stop adlamin-socket

cd kernel
./update.sh $DOCKER_SOCKET
cd ..

cd cd_utils
./update.sh $DOCKER_USER
cd ..

systemctl start adlamin-socket

nano /etc/adlamin/configuration.json

echo "Adlamin actualizado"
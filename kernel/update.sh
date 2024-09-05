#!/bin/bash

cp ./override.conf /home/deploy/.config/systemd/user/docker.service.d
chmod 644 /home/deploy/.config/systemd/user/docker.service.d/override.conf

cp configuration.json /etc/adlamin

echo "generando la imagen de adlamin-nginx..."
docker -H $1 build -t adlamin-nginx ./docker/nginx

echo "generando la imagen de adlamin-stats..."
docker -H $1 build -t adlamin-stats ./docker/stats

echo "reseteando todos los contenedores para aplicar posibles cambios en las imagenes de docker..."
./restart_all_containers.sh $1
#!/bin/bash

getIpAddress () {

    ipAddress=`sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $1`

    echo $ipAddress
}

docker_run() {

    ID=$(sudo docker run --network="$3" --name="$2" -d --rm $1)

    sleep 5s

    IP=$(getIpAddress $ID)

    echo $IP
}
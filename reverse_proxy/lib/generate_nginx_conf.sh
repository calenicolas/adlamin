#!/bin/bash

function generate_nginx_conf() {
    local SERVER_NAME="$1"
    local URI="$2"
    local CONTAINER_IP="$3"
    local CONTAINER_PORT="$4"
    local NAME
    NAME=$(date +%s)

    node /usr/local/lib/reverse_proxy/generate_nginx_conf.js "$NAME" "$SERVER_NAME" "$URI" "$CONTAINER_IP:$CONTAINER_PORT"
}
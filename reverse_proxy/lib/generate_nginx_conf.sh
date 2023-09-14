#!/bin/bash

function generate_nginx_conf() {
    local SERVER_NAME="$1"
    local URI="$2"
    local UPSTREAMS_FILE="$3"
    local CLIENTS_FILE="$4"
    local TEMPLATE_PATH="/usr/local/lib/reverse_proxy/conf_template"
    local NAME
    NAME=$(date +%s)

    node /usr/local/lib/reverse_proxy/generate_nginx_conf.js "$NAME" "$SERVER_NAME" "$URI" "$UPSTREAMS_FILE" "$CLIENTS_FILE" "$TEMPLATE_PATH"
}
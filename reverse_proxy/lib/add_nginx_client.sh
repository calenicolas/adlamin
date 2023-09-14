#!/bin/bash

function add_nginx_client() {
  local CLIENT_IP="$1"
  local CLIENTS_FILE="$2"

  node /usr/local/lib/reverse_proxy/add_nginx_client.js "$CLIENT_IP" "$CLIENTS_FILE"
}
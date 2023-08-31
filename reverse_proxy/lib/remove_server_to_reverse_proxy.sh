#!/bin/bash

. /usr/local/lib/reverse_proxy/generate_nginx_conf.sh
. /usr/local/lib/reverse_proxy/remove_upstream.sh
. /usr/local/lib/iptables_utils/allow_internal_forward_to_server.sh

function remove_server_to_reverse_proxy() {
  local CONTAINER_NAME="$1"
  local SERVER_NAME="$2"
  local URI="$3"
  local CONTAINER_IP="$4"
  local SERVICE_PORT="$5"

  local CONF_PATH=/etc/reverse-proxy/conf.d/"$CONTAINER_NAME/"

  remove_upstream "$CONTAINER_IP" "$SERVICE_PORT" "$CONF_PATH/upstreams.json"
  generate_nginx_conf "$SERVER_NAME" "$URI" "$CONF_PATH/upstreams.json" > "$CONF_PATH/$SERVER_NAME.conf"

  docker exec "$CONTAINER_NAME" nginx -s reload
}
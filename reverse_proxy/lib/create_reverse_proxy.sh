#!/bin/bash
. /usr/local/lib/docker_utils/docker_run.sh
. /usr/local/lib/iptables_utils/allow_forward_to_server_from_any.sh

function create_reverse_proxy() {
  local CONTAINER_NAME="$1"
  local SERVICE_PORT="$2"
  local INTERNAL_NETWORK="$3"
  local IMAGE_NAME="$4"
  local PROTOCOL="$5"
  local PUBLIC_INTERFACE="$6"
  local PUBLIC_PORT="$7"

  local CONF_PATH="/etc/reverse-proxy/conf.d/$CONTAINER_NAME"
  if [ -d "$CONF_PATH" ]; then rm -Rf $CONF_PATH; fi
  mkdir -p "$CONF_PATH"

  local EXTRA_OPTS="--mount type=bind,source=$CONF_PATH,target=/etc/nginx/conf.d"
  CONTAINER_IP=$(docker_run "$CONTAINER_NAME" "$SERVICE_PORT" "$INTERNAL_NETWORK" "$IMAGE_NAME" "$EXTRA_OPTS")

  allow_forward_to_server_from_any "$PROTOCOL" "$PUBLIC_INTERFACE" "$PUBLIC_PORT" "$CONTAINER_IP" "$SERVICE_PORT"
}
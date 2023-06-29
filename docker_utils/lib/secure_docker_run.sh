#!/bin/bash
. /usr/local/lib/docker_utils/docker_run.sh
. /usr/local/lib/knock_utils/gen_knock_rules.sh

function secure_docker_run() {
  local CONTAINER_NAME="$1"
  local SERVICE_PORT="$2"
  local INTERNAL_NETWORK="$3"
  local IMAGE_NAME="$4"
  local PUBLIC_INTERFACE="$5"
  local PUBLIC_PORT="$6"
  local SEQUENCE="$7"
  local PROTOCOL="$8"
  local EXTRA_OPTS="$9"

  CONTAINER_IP=$(docker_run "$CONTAINER_NAME" "$SERVICE_PORT" "$INTERNAL_NETWORK" "$IMAGE_NAME" "$EXTRA_OPTS")

  OPEN_COMMAND="/usr/local/sbin/iptables-allow_forward_to_server $PROTOCOL $PUBLIC_INTERFACE $PUBLIC_PORT %IP% $CONTAINER_IP $SERVICE_PORT"
  CLOSE_COMMAND="/usr/local/sbin/iptables-deny_forward_to_server $PROTOCOL $PUBLIC_INTERFACE $PUBLIC_PORT %IP% $CONTAINER_IP $SERVICE_PORT"

  KNOCK_RULES=$(gen_knock_rules "$CONTAINER_NAME" "$SEQUENCE" "$OPEN_COMMAND" "$CLOSE_COMMAND")

  echo "$KNOCK_RULES" >> /etc/knockd.conf

  systemctl restart knockd
}
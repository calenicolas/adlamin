#!/bin/bash
. /usr/local/lib/docker_utils/docker_run.sh
. /usr/local/lib/iptables_utils/allow_forward_to_server_from_any.sh

function public_docker_run() {
  local CONTAINER_NAME=$1
  local SERVICE_PORT=$2
  local INTERNAL_NETWORK=$3
  local IMAGE_NAME=$4
  local PROTOCOL=$5
  local PUBLIC_INTERFACE=$6
  local PUBLIC_PORT=$7
  local PUBLIC_PORT=$7
  local EXTRA_OPTS=""

  CONTAINER_IP=$(docker_run "$CONTAINER_NAME" "$SERVICE_PORT" "$INTERNAL_NETWORK" "$IMAGE_NAME" "$EXTRA_OPTS")
  allow_forward_to_server_from_any "$PROTOCOL" "$PUBLIC_INTERFACE" "$PUBLIC_PORT" "$CONTAINER_IP" "$SERVICE_PORT"
}
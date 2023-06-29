#!/bin/bash
. /usr/local/lib/docker_utils/docker_run.sh

function internal_docker_run() {
  local IMAGE_NAME=$1
  local CONTAINER_NAME=$2
  local SERVICE_PORT=$3
  local INTERNAL_NETWORK=$4
  local EXTRA_OPTS=""

  docker_run "$CONTAINER_NAME" "$SERVICE_PORT" "$INTERNAL_NETWORK" "$IMAGE_NAME" "$EXTRA_OPTS"
}
#!/bin/bash
. /usr/local/lib/docker_utils/get_container_ip.sh

function docker_run() {
  local CONTAINER_NAME="$1"
  local SERVICE_PORT="$2"
  local NETWORK="internal"
  local IMAGE_NAME="$4"
  local EXTRA_OPTS="$5"

  create_network "$NETWORK"

  local CONTAINER_ID
  local DOCKER_RUN_COMMAND="docker run -it --rm --name $CONTAINER_NAME -p 0:$SERVICE_PORT --network $NETWORK $EXTRA_OPTS -d $IMAGE_NAME"
  CONTAINER_ID=$($DOCKER_RUN_COMMAND)

  get_container_ip "$CONTAINER_ID" "$NETWORK"
}

function create_network() {
  local NETWORK="$1"
  NETWORK_EXISTS=$(docker network ls | grep -w "$NETWORK")

  if [ ! "$NETWORK_EXISTS" ]
  then
    docker network create --opt "com.docker.network.bridge.name=$NETWORK" "$NETWORK" > /dev/null 2>&1
  fi
}
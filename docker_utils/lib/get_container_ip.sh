#!/bin/bash

function get_container_ip() {
  local CONTAINER_ID="$1"
  local NETWORK="$2"
  docker container inspect -f "{{ .NetworkSettings.Networks.$NETWORK.IPAddress }}" "$CONTAINER_ID"
}
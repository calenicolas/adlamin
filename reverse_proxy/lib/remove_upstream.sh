#!/bin/bash

function remove_upstream() {
  local CONTAINER_IP="$1"
  local SERVICE_PORT="$2"
  local UPSTREAMS_FILE="$3"

  node /usr/local/lib/reverse_proxy/remove_upstream.js "$CONTAINER_IP" "$SERVICE_PORT" "$UPSTREAMS_FILE"
}
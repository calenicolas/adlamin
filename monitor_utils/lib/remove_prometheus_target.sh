#!/bin/bash

function remove_prometheus_target() {
  local SERVICE_IP=$1
  local SERVICE_NAME=$2
  local PROMETHEUS_CONFIG="/etc/adlamin/monitor/prometheus.yml"

  node /usr/local/lib/monitor_utils/remove_prometheus_target.js $SERVICE_IP $SERVICE_NAME $PROMETHEUS_CONFIG
  docker restart prometheus
}
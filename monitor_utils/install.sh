#!/bin/bash

mkdir -p /usr/local/lib/monitor_utils || true
cp -r lib/* /usr/local/lib/monitor_utils
npm install yaml -C /usr/local/lib/monitor_utils

PROMETHEUS_CONFIG_PATH="/etc/adlamin/monitor"
PROMETHEUS_CONFIG="$PROMETHEUS_CONFIG_PATH/prometheus.yml"

mkdir -p $PROMETHEUS_CONFIG_PATH/data || true
cp prometheus.yml $PROMETHEUS_CONFIG
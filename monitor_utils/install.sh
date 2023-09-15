#!/bin/bash

mkdir -p /usr/local/lib/monitor_utils || true
cp -r lib/* /usr/local/lib/monitor_utils
npm install yaml -C /usr/local/lib/monitor_utils

PROMETHEUS_CONFIG_PATH="/etc/adlamin/monitor"
PROMETHEUS_CONFIG="$PROMETHEUS_CONFIG_PATH/prometheus.yml"
PROMETHEUS_EMTPY_CONFIG="$PROMETHEUS_CONFIG_PATH/empty_prometheus.yml"

mkdir -p $PROMETHEUS_CONFIG_PATH/data || true
chown 65534:65534 $PROMETHEUS_CONFIG_PATH/data || true
cp prometheus.yml $PROMETHEUS_CONFIG
cp prometheus.yml $PROMETHEUS_EMTPY_CONFIG
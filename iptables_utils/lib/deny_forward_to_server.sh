#!/bin/bash

deny_forward_to_server() {
  local PROTOCOL=$1
  local INPUT_INTERFACE=$2
  local INPUT_PORT=$3
  local SOURCE_IP=$4
  local TARGET_IP=$5
  local PORT=$6

  iptables \
    -D FORWARD \
    -p "$PROTOCOL" \
    -i "$INPUT_INTERFACE" \
    -s "$SOURCE_IP" \
    --dport "$PORT" \
    -d "$TARGET_IP" \
    -m state \
    --state NEW,ESTABLISHED \
    -j ACCEPT
  iptables \
    -D FORWARD \
    -p "$PROTOCOL" \
    -o "$INPUT_INTERFACE" \
    -d "$SOURCE_IP" \
    --sport "$PORT" \
    -s "$TARGET_IP" \
    -m state \
    --state ESTABLISHED -j ACCEPT

  iptables -t nat -D PREROUTING -i "$INPUT_INTERFACE" -p "$PROTOCOL" -s "$SOURCE_IP" --dport "$INPUT_PORT" -j DNAT --to "$TARGET_IP":"$PORT"
}


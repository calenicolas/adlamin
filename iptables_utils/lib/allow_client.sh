#!/bin/bash 

allow_client() {
  local PROTOCOL=$1
  local INTERFACE=$2
  local PORT=$3

  iptables -I INPUT -p "$PROTOCOL" -i "$INTERFACE" --sport "$PORT" -m state --state ESTABLISHED -j ACCEPT
  iptables -I OUTPUT -p "$PROTOCOL" -o "$INTERFACE" --dport "$PORT" -m state --state NEW,ESTABLISHED -j ACCEPT
}

#!/bin/bash

gen_knock_rules() {
  local ARGUS=()
  for ARG in "$@"
  do
    ARGUS+=("${ARG}")
  done;

  node /usr/local/lib/knock_utils/gen_knock_rules_from_json.js "${ARGUS[0]}" "${ARGUS[1]}" "${ARGUS[2]}" "${ARGUS[3]}" "/etc/knockd.conf"
}

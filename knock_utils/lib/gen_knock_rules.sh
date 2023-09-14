#!/bin/bash

ARGUS=()

gen_knock_rules() {
  for ARG in "$@"
  do
    ARGUS+=("${ARG}")
  done;

  node ./gen_knock_rules_from_json.js "${ARGUS[0]}" "${ARGUS[1]}" "${ARGUS[2]}" "${ARGUS[3]}" "/etc/knockd.conf"
}

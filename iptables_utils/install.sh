#!/bin/bash

cp -r sbin/* /usr/local/sbin

mkdir /usr/local/lib/iptables_utils || true
cp -r lib/* /usr/local/lib/iptables_utils
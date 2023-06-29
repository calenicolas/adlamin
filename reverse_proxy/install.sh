#!/bin/bash

mkdir /usr/local/lib/reverse_proxy || true

cp -r lib/* /usr/local/lib/reverse_proxy
cp -r sbin/* /usr/local/sbin
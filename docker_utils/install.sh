#!/bin/bash

cp -r sbin/* /usr/local/sbin

mkdir /usr/local/lib/docker_utils || true
cp -r lib/* /usr/local/lib/docker_utils
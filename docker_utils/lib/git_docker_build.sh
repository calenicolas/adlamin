#!/bin/bash

function git_docker_build() {
  local GIT_REPO="$1"
  local IMAGE_NAME="$2"

  TMP_DIR=$(mktemp -d /tmp/cd-build.XXXXXX)

  git clone "$GIT_REPO" "$TMP_DIR"
  docker build -t "$IMAGE_NAME" "$TMP_DIR"

  rm -rf "$TMP_DIR"
}
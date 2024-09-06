#!/bin/bash

YML_DIR=$(jq -r '.applicationsPath' "/etc/adlamin/configuration.json")

if [ ! -d "$YML_DIR" ]; then
  echo "Directorio no encontrado: $YML_DIR"
  exit 1
fi

YML_FILES=$(find "$YML_DIR" -name "*.yml")

if [ -z "$YML_FILES" ]; then
  echo "No se encontraron archivos YML en: $YML_DIR"
  exit 1
fi

for FILE in $YML_FILES; do
  docker -H $1 compose -f "$FILE" down --remove-orphans
done

for FILE in $YML_FILES; do
  docker -H $1 compose -f "$FILE" up -d
done

echo "Completado."
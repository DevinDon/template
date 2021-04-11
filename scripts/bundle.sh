#!/usr/bin/env bash
set -e

if [ ! -d "dist" ]; then
  mkdir dist
fi

deno bundle --import-map=import-map.json $@ sources/main.ts dist/bundle.js

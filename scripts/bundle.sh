#!/usr/bin/env bash
set -e

if [ ! -d "dist" ]; then
  mkdir dist
fi

deno bundle --import-map=import-map.json $@ src/main.ts dist/bundle.js

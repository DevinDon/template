#!/usr/bin/env bash
set -e

if [ ! -d "dist" ]; then
  mkdir dist
fi

deno bundle $@ src/main/main.ts dist/bundle.js

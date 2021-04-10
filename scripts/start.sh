#!/usr/bin/env bash
set -e

deno run --import-map=import-map.json --allow-all $@ src/main.ts

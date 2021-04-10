#!/usr/bin/env bash
set -e

deno test --import-map=import-map.json --allow-all $@ src/

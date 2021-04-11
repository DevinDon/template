#!/usr/bin/env bash
set -e

eslint . --fix
deno lint --unstable sources/

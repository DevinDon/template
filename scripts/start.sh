#!/usr/bin/env bash
set -e

if [ $MODE == "PROD" ];
then
  npm run build && cd dist && node main.js
else
  node -r ts-node/register src/main.ts
fi

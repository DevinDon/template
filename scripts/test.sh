#!/usr/bin/env bash
set -e

echo "You should start your server first."

node node_modules/jasmine/bin/jasmine.js \
  --config=jasmine.json \
  --reporter=jasmine-console-reporter \
  --require=ts-node/register

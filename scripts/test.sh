#!/usr/bin/env bash
set -e

node node_modules/jasmine/bin/jasmine.js \
  --config=jasmine.json \
  --reporter=jasmine-console-reporter \
  --require=ts-node/register
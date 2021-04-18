#!/usr/bin/env bash

docker network create rester

docker rm -f rester-redis | xargs echo removed container
docker rm -f rester-mongo | xargs echo removed container

docker run -d \
  --name rester-redis \
  -p 6379:6379 \
  -v rester-redis:/data \
  --network rester \
  redis:6.0.9 \
  redis-server --requirepass "rester-redis" --notify-keyspace-events "Ex" \
  | xargs echo container rester-redis started

docker run -d \
    --name rester-mongo \
    -p 27017:27017 \
    -e "MONGO_INITDB_ROOT_USERNAME=username" \
    -e "MONGO_INITDB_ROOT_PASSWORD=password" \
    -v rester-mongo:/data/db \
    --network rester \
    mongo:4 \
  | xargs echo container rester-mongo started

FROM node:14-alpine3.12

WORKDIR /app
ENV MODE=PROD

COPY index.js /app/index.js
COPY resources /app/resources
COPY rester.json /app/rester.json

ENTRYPOINT [ "node", "index.js" ]

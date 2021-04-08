FROM node:14-alpine3.12

WORKDIR /app
ENV MODE=PROD

COPY bundle.js /app

ENTRYPOINT [ "node", "bundle.js" ]

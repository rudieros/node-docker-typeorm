FROM node:8-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY . ./

USER root
RUN apk --no-cache add --virtual builds-deps build-base python

USER node
RUN yarn install && ls -la && yarn build

COPY --chown=node:node . /home/node/app

EXPOSE 8000

ENV NODE_ENV staging

CMD [ "node", "build/server.js" ]

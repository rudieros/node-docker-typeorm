FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY . ./

USER node

RUN yarn install && ls -la && yarn build

COPY --chown=node:node . /home/node/app

EXPOSE 8000

CMD [ "node", "build/server.js" ]

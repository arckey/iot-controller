FROM node:14.16.0-alpine3.13

WORKDIR /app

RUN apk upgrade

COPY package*.json .

ENV NODE_ENV production

RUN npm ci

COPY . .

RUN ln -s /app/iot /usr/local/bin/iot

ENTRYPOINT [ "iot" ]
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN apk update
RUN apk add
RUN apk add ffmpeg

COPY . .

RUN node deploy-commands.js
RUN node index.js
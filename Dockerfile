FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN apk update && apk add python3 build-base

RUN npm install

RUN apk update && apk add ffmpeg

COPY . .

CMD ["node", "deploy-commands.js"]
CMD ["node", "index.js"]
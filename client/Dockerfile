FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=2048"

RUN npm run build --verbose

EXPOSE 3000

CMD ["npm","run","start"]
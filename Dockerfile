FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache git

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

EXPOSE 4300

CMD ["npm", "run", "start"]

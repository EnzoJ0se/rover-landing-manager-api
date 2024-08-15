# Dockerfile for Express API server
FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . ./
COPY .env.docker ./.env

EXPOSE 3000

CMD ["npm", "run", "dev"]

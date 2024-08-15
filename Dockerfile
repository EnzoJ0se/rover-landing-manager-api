# Dockerfile for Express API server
FROM node

WORKDIR /app

COPY package.json .
COPY .env.docker .env

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "dev"]

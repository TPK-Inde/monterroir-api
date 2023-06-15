FROM node:18
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm ci --omit=dev
COPY ./compile/ ./
COPY ./.ENV.production ./.ENV
EXPOSE 3000
CMD npx dotenv -e .ENV node server.js

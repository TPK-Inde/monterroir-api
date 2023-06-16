FROM node:18 as build
WORKDIR /usr/src/app
COPY ./ ./
RUN npm ci --omit=dev
RUN npx tsc

FROM node:18 as prod
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/compile/ ./
COPY --from=build /usr/src/app/node_modules/ ./node_modules/
COPY ./.ENV.production ./.ENV
RUN ls -al
EXPOSE 3000
CMD npx dotenv -e .ENV node server.js

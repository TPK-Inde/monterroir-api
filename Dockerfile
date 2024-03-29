FROM node:18 AS build
WORKDIR /usr/src/app
COPY ./ ./
RUN npm ci --omit=dev
RUN npx tsc

FROM node:18 AS prod
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/compile/ ./
COPY --from=build /usr/src/app/node_modules/ ./node_modules/
RUN ls -al
EXPOSE 3000
CMD node server.js

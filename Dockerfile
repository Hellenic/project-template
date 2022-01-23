FROM node:14-alpine

ARG environment=staging

WORKDIR app
COPY . .
COPY .env.${environment} .env
RUN rm .env.*

RUN npm install
RUN npm run build

EXPOSE 3000
CMD node build/server.js

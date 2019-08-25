FROM node:carbon-alpine

ENV DEBUG expresso:*,ms-person:*

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

## Install dependencies
COPY ["./package.json", "./package-lock.json", "/usr/src/app/"]

RUN npm install

## Add source code
COPY ["./src", "/usr/src/app/src"]
COPY ["./tsconfig.json", "/usr/src/app/"]

## Build
RUN npm run build:clean

## Remove source code
RUN rm -rf /usr/ser/app/src

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]

FROM node:8

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i

COPY . ./
RUN npm run build:prod

EXPOSE 80

CMD npm run serve:prod

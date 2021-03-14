# staging
FROM node:latest

WORKDIR "/usr/gubal-steward/"

COPY . .

RUN npm install

#Start app
CMD [ "node", "src/index.js" ]

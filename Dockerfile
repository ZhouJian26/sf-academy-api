FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY sf-academy-proto/ sf-academy-proto/
COPY api/ api/
COPY src/index.js src/

EXPOSE 3000

CMD ["npm","start"]
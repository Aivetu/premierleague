FROM node:18-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .


EXPOSE 8081

CMD ["npm","run","dev"]
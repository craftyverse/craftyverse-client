FROM --platform=linux/amd64 node:18-alpine

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
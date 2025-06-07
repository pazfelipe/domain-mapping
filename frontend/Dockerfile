FROM node:22-alpine

WORKDIR /app

COPY package.json ./

ENV NODE_ENV=development

RUN yarn install

COPY . .

EXPOSE 5173

CMD ["yarn", "dev"]
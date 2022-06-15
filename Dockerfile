FROM node:14.16.0
WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
USER node
EXPOSE 3000
CMD ["yarn","start:dev"]
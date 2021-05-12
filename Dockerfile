FROM node:14.16.0
WORKDIR /usr/src/
RUN chown -R node:node /usr/src
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . /app
USER node
EXPOSE 3000
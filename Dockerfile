FROM node:16.14.0-alpine

WORKDIR /usr
COPY package.json ./
RUN apk --no-cache add yarn  --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community
RUN yarn install --production
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY src ./src
RUN yarn add -D typescript tscpaths
RUN yarn build
ENV NODE_ENV production

EXPOSE 3333

CMD ["yarn","start"]

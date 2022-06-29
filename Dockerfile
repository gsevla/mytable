# DEPS STAGE
FROM node:16-alpine as deps

# ARG NODE_ENV=production
# ENV NODE_ENV $NODE_ENV

WORKDIR /usr/src/mytable

COPY package.json .
COPY yarn.lock .

COPY config/eslint-config/package.json ./config/eslint-config/package.json
COPY config/prettier-config/package.json ./config/prettier-config/package.json

COPY lib/api-service/package.json ./lib/api-service/package.json

COPY apps/server/package.json ./apps/server/package.json
COPY apps/server/prisma ./apps/server/prisma

COPY apps/client/package.json ./apps/client/package.json
COPY apps/restaurant/package.json ./apps/restaurant/package.json

# RUN yarn install --frozen-lockfile --non-interactive
# RUN yarn --ignore-scripts
# RUN npm install -g npm@7.24.0
# RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN apk add --no-cache python3 make g++
RUN yarn install

COPY . .

# BUILD SERVER STAGE
FROM node:16-alpine as build_server

WORKDIR /usr/src/mytable

COPY --from=deps /usr/src/mytable .

WORKDIR /usr/src/mytable/server

RUN yarn build

WORKDIR /usr/src/mytable/server/dist

# nestjs default port
EXPOSE 3000
# prisma studio default port
EXPOSE 5555

CMD ["node", "dist/main"]

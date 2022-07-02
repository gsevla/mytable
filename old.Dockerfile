################
## DEVELOPMENT STAGE
################
FROM node:16-alpine as development

WORKDIR /usr/src/mytable

COPY package.json .
COPY yarn.lock .

COPY config/eslint-config/package.json ./config/eslint-config/package.json
COPY config/prettier-config/package.json ./config/prettier-config/package.json

COPY lib/api-service/package.json ./lib/api-service/package.json

COPY apps/server/package.json ./apps/server/package.json
COPY apps/client/package.json ./apps/client/package.json
COPY apps/restaurant/package.json ./apps/restaurant/package.json

RUN apk add --no-cache python3 make g++

RUN yarn install --frozen-lockfile

# COPY apps/server/prisma ./apps/server/prisma

COPY . .

RUN yarn workspace @mytable/server prisma:db:push

################
## BUILD STAGE
################
# FROM node:16-alpine as build_server

# WORKDIR /usr/src/mytable

# COPY --from=deps /usr/src/mytable .

# WORKDIR /usr/src/mytable/server

# RUN yarn build


################
## DEPLOY STAGE
################
# WORKDIR /usr/src/mytable/server/dist

# # nestjs default port
# EXPOSE 3000

# CMD ["node", "dist/main"]

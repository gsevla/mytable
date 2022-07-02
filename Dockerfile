################
## DEPS STAGE
################
FROM node:16-alpine as development

WORKDIR /usr/src/mytable

COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .

COPY --chown=node:node config/eslint-config/package.json ./config/eslint-config/package.json
COPY --chown=node:node config/prettier-config/package.json ./config/prettier-config/package.json

COPY --chown=node:node lib/api-service/package.json ./lib/api-service/package.json

COPY --chown=node:node apps/server/package.json ./apps/server/package.json
COPY --chown=node:node apps/client/package.json ./apps/client/package.json
COPY --chown=node:node apps/restaurant/package.json ./apps/restaurant/package.json

RUN apk add --no-cache python3 make g++

USER node

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .


################
## BUILD SERVER STAGE
################
# FROM node:16-alpine as build_server

# WORKDIR /usr/src/mytable

# COPY --from=deps /usr/src/mytable .

# WORKDIR /usr/src/mytable/server

# RUN yarn build

# WORKDIR /usr/src/mytable/server/dist

# # nestjs default port
# EXPOSE 3000

# CMD ["node", "dist/main"]

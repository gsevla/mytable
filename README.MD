# MyTable
###### MyTable is my CS term paper


## What is it?
todo


## Why?
todo


## Development
### Stack
- Yarn Workspaces and TypeScript
- NestJS, Prisma and PostgreSQL
- Expo and Next.js

### How to run for development?
> First of all you need to duplicate .env.example into .env and populate it<br/>

#### Server
##### With Docker
Run `docker compose -f docker-compose.dev.yml up -d` from mytable's root<br/>
When it's done you'll need to create the database. It can be done by:<br/>
Running `yarn workspace @mytable/server prisma:db:push` to create only<br/>
Or running `yarn workspace @mytable/server prisma:migrate:dev` to create and populate your database with seed data from *apps/server/prisma/server/seed.ts*

##### Without Docker
Run `yarn` from mytable's root<br/>
When it's done you'll need to generate prisma assets by running `yarn workspace @mytable/server prisma:generate`<br/>
Now you'll need to create the database. It can be done by:<br/>
Running `yarn workspace @mytable/server prisma:db:push` to create only<br/>
Or running `yarn workspace @mytable/server prisma:migrate:dev` to create and populate your database with seed data from *apps/server/prisma/server/seed.ts*<br/>
Then run `yarn server:dev`

Now your server should be available under `http://${HOST_ADDR}:${SERVER_PORT}`.<br/>
> api: `http://${HOST_ADDR}:${SERVER_PORT}/api`<br/>
> docs: `http://${HOST_ADDR}:${SERVER_PORT}/docs`

As we use prisma, you can use Prisma Studio by running `yarn workspace @mytable/server prisma:studio`. It should available under `http://localhost:5555` or `http://${HOST_ADDR}:5555`

#### Client
##### Mobile
Run `yarn` from mytable's root<br/>
When it's done run `yarn client:android:dev` or `yarn client:ios:dev`

Now your emulator/simulator should be opened(if not already), expo app installed and your app initialized.

##### Web (Next.js)
Run `yarn` from mytable's root<br/>
When it's done run `yarn client:next:dev`

Now your web server should be available under `http://${HOST_ADDR}:4000`

> You can change default port by modifying *next:dev* script under *apps/client/package.json*.

#### Restaurant
todo

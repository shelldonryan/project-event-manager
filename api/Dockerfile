FROM node:20 AS base
RUN npm i -g pnpm

FROM base AS dependencies
WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app/
RUN pnpm import package-lock.json && rm -f package-lock.json && pnpm install

FROM base AS build
WORKDIR /usr/src/app
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN pnpm build
RUN pnpm prune --prod

FROM node:20-alpine3.19 AS deploy
WORKDIR /usr/src/app
RUN npm i -g pnpm prisma
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/prisma ./prisma
RUN pnpm prisma generate
RUN apk update
RUN apk add --no-cache curl
RUN curl -sSL -o wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for
RUN chmod u+x ./wait-for
EXPOSE 1502
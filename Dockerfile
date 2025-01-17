FROM node:18-alpine AS builder

ARG GITHUB_PAT

WORKDIR /app

COPY package*.json .
COPY pnpm-lock.yaml .

RUN npm i -g pnpm
RUN pnpm install

COPY . .

ENV GITHUB_PAT=$GITHUB_PAT

RUN pnpm run generate
RUN pnpm run build
RUN pnpm prune --prod

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/build build/
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /app/static static/

EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]

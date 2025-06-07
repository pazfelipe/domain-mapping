FROM oven/bun:1 AS base

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

EXPOSE 3000

ENTRYPOINT ["bun", "--hot", "index.ts"]
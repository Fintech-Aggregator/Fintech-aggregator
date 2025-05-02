# syntax=docker/dockerfile:1.4

FROM node:20.11.1-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

# Production image
FROM node:20.11.1-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/.env ./

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]

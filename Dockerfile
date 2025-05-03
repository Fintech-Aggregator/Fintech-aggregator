# ---------- Base ----------
FROM node:20-bullseye AS base
WORKDIR /app
COPY package*.json ./

# ---------- Development ----------
FROM base AS development
WORKDIR /app

ENV NODE_ENV=development
COPY prisma ./prisma/
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ---------- Production ----------
FROM base AS build
ENV NODE_ENV=production
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-bullseye AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/.env.production ./.env.production
EXPOSE 3000
CMD ["npm", "start"]
    
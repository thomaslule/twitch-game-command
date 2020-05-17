FROM node:14 AS build

WORKDIR /frontend

COPY frontend/public ./public
COPY frontend/src ./src
COPY frontend/.env* ./
COPY frontend/.eslintrc.js ./
COPY frontend/babel.config.js ./
COPY frontend/package*.json ./
COPY frontend/tsconfig.json ./
RUN npm install
RUN npm run build

WORKDIR /backend

COPY backend/src ./src
COPY backend/package*.json ./
COPY backend/tsconfig.json ./
RUN npm install
RUN npm run build
RUN npm prune --production
RUN mv ../frontend/dist ./public

FROM node:14

WORKDIR /root

COPY --from=build /backend/node_modules ./node_modules
COPY --from=build /backend/dist ./dist
COPY --from=build /backend/public ./public
VOLUME /root/stored

ENTRYPOINT ["node", "dist/index.js"]

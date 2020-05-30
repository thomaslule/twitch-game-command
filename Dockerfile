FROM node:14 AS build

WORKDIR /root

COPY build.js ./
COPY package.json ./

COPY frontend/public ./frontend/public
COPY frontend/src ./frontend/src
COPY frontend/.env* ./frontend/
COPY frontend/.eslintrc.js ./frontend/
COPY frontend/babel.config.js ./frontend/
COPY frontend/package*.json ./frontend/
COPY frontend/tsconfig.json ./frontend/

COPY backend/src ./backend/src
COPY backend/.env* ./backend/
COPY backend/package*.json ./backend/
COPY backend/tsconfig.json ./backend/

RUN npm run build
RUN npm run backend:prune

FROM node:14

WORKDIR /root

COPY --from=build /root/backend/node_modules ./node_modules
COPY --from=build /root/backend/dist ./dist
COPY --from=build /root/backend/public ./public
VOLUME /root/stored

ENTRYPOINT ["node", "dist/index.js"]

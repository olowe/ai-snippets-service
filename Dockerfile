FROM node:20-bullseye

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["sh", "-c", "npm run test:dev && npm start"]
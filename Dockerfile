FROM node:20-bullseye

# Install netcat for MongoDB health check
RUN apt-get update && apt-get install -y netcat && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

# Wait for MongoDB to be ready before running tests
CMD ["sh", "-c", "until nc -z mongodb 27017; do echo 'Waiting for MongoDB...'; sleep 1; done && npm run test && npm start"]
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { afterAll, afterEach, beforeAll } from 'vitest';

let memoryServer: MongoMemoryServer;
// Check if we're running in Docker by looking for the mongodb service
const isDocker = process.env.NODE_ENV === 'production';

const mongoUri = isDocker
  ? process.env.TEST_MONGODB_URI // Use the Docker service
  : undefined; // Will use MongoDB Memory Server

beforeAll(async () => {
  let uri: string;

  if (isDocker) {
    // In Docker, use the real MongoDB container
    uri = mongoUri as string;
    console.log('Using Docker MongoDB container for tests');
  } else {
    // Locally, use MongoDB Memory Server
    memoryServer = await MongoMemoryServer.create();
    uri = memoryServer.getUri();
    console.log('Using MongoDB Memory Server for tests');
  }

  await mongoose.connect(uri);

  // timeout for init delay in some envs
}, 300000);

afterEach(async () => {
  // Clear database after each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    if (collections[key]) {
      await collections[key].deleteMany();
    }
  }
});

afterAll(async () => {
  // Disconnect and stop in-memory database
  await mongoose.disconnect();

  if (memoryServer) {
    await memoryServer.stop({ doCleanup: true, force: true });
  }
});

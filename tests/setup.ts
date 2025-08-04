import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { afterAll, afterEach, beforeAll } from 'vitest';

let memoryServer: MongoMemoryServer;

beforeAll(async () => {
  // Start instance of in-memory database
  memoryServer = await MongoMemoryServer.create();
  const mongoUri = memoryServer.getUri();

  // Connect mongoose to the in-memory database
  await mongoose.connect(mongoUri);
});

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
  await memoryServer.stop();
});

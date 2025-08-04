import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI as string;
    await mongoose.connect(mongoUri);
    console.log('DB connected successfully');
  } catch (error) {
    console.error('DB connection error:', error);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('DB disconnected successfully');
  } catch (error) {
    console.error('DB disconnection error:', error);
  }
};

// Handle connection events
mongoose.connection.on('error', (error) => {
  console.error('DB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('DB disconnected');
});

// On shutdown
process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit();
});

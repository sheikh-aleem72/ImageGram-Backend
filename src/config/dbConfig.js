import mongoose from 'mongoose';

import { DEV_DB_URL, NODE_ENV } from './serverConfig.js';

export default async function connectDB() {
  try {
    await mongoose.connect(DEV_DB_URL);

    console.log(`Connected to ${NODE_ENV} database successfully`);
  } catch (error) {
    console.log('Error while connecting to database: ', error);
  }
}

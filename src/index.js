import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
  await initMongoConnection();
  setupServer(PORT);
};

bootstrap();

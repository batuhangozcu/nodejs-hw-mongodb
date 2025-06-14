import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { handleGetContacts } from './controllers/contacts.js';
import { handleGetContactById } from './controllers/contacts.js';

export const setupServer = (PORT) => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.get('/contacts', handleGetContacts);
  app.get('/contacts/:contactId', handleGetContactById);

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not Found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

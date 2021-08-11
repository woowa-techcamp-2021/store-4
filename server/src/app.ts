import express from 'express';
import dotenv from './config/dotenv';
import Loaders from './loaders';

const app = express();

const startServer = async () => {
  await Loaders.init(app);

  app.listen(dotenv.PORT, () => {
    console.log(`Running ${dotenv.PORT}`);
  });
};

startServer();

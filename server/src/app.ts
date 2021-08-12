import express from 'express';
import dotenv from './config/dotenv';
import Loaders from './loaders';
import apiRouter from './routers';

const app = express();

const startServer = async () => {
  await Loaders.init(app);

  app.use('/api', apiRouter);

  app.listen(dotenv.PORT, () => {
    console.log(`Running ${dotenv.PORT}`);
  });
};

startServer();

import express from 'express';
import dotenv from './config/dotenv';
import Loaders from './loaders';
import apiRouter from './routers/api';
import authRouter from './routers/auth';
import errorMiddleware from './middlewares/error-middleware';

const app = express();

const startServer = async () => {
  await Loaders.init(app);

  app.use('/api', apiRouter);
  app.use('/auth', authRouter);

  app.use(errorMiddleware);

  app.listen(dotenv.PORT, () => {
    console.log(`Running ${dotenv.PORT}`);
  });
};

startServer();

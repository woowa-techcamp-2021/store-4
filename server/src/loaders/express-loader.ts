import express, { Application } from 'express';
import cors from 'cors';
import logger from 'morgan';

const loader = (app: Application) => {
  app.use(cors());
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

  return;
};

export default loader;

import express, { Application } from 'express';
import cors from 'cors';
import logger from 'morgan';

const loader = (app: Application): void => {
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
};

export default loader;

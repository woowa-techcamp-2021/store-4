import expressLoader from './express-loader';
import databaseLoader from './db-loader';
import { Application } from 'express';

const init = async (app: Application): Promise<void> => {
  await databaseLoader();
  console.log('Database connected!');
  expressLoader(app);
  console.log('Express middleware loaded!');
};

export default {
  init,
};

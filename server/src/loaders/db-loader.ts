import Database from '../database';
import dotenv from '../config/dotenv';
import models from '../models';

const loader = async (): Promise<void> => {
  const db = new Database({
    type: 'mysql',
    host: dotenv.MYSQL_HOST,
    port: parseInt(dotenv.MYSQL_PORT),
    username: dotenv.MYSQL_USERNAME,
    password: dotenv.MYSQL_PASSWORD,
    database: dotenv.MYSQL_DATABASE,
    entities: [...models],
    synchronize: dotenv.MYSQL_SYNC === 'true',
  });

  await db.connect();
};

export default loader;

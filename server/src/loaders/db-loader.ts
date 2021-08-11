import Database from '../database';
import dotenv from '../config/dotenv';

const loader = async (): Promise<void> => {
  const db = new Database({
    type: 'mysql',
    host: dotenv.MYSQL_HOST,
    port: parseInt(dotenv.MYSQL_PORT),
    username: dotenv.MYSQL_USERNAME,
    password: dotenv.MYSQL_PASSWORD,
    database: dotenv.MYSQL_DATABASE,
    entities: ['../models/*.ts'],
    synchronize: dotenv.MYSQL_SYNC === 'true',
  });
  await db.connect();
};

export default loader;

import Database from '../database';
import dotenv from '../config/dotenv';
import models from '../models';
import { insertDummyCategoryData } from '../dummy-data/category';
import { insertDummyProductData } from '../dummy-data/product';
import { insertDummyReviewData } from '../dummy-data/reviews';
import { insertDummyOrderData } from '../dummy-data/order';
import { insertDummyOptionDetailData } from '../dummy-data/order-detail';

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

  await insertDummyCategoryData();
  await insertDummyProductData();
  await insertDummyReviewData();
  await insertDummyOrderData();
  await insertDummyOptionDetailData();
};

export default loader;

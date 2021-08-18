import CategoryAPI from './category';
import ProductAPI from './product';

const baseURL = process.env.SERVER_URL as string;

const apis = {
  categoryAPI: new CategoryAPI(baseURL),
  productAPI: new ProductAPI(baseURL),
};

export default apis;

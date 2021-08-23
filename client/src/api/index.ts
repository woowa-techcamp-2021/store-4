import CategoryAPI from './category';
import ProductAPI from './product';
import UserAPI from './user';

const baseURL = process.env.SERVER_URL as string;

const apis = {
  categoryAPI: new CategoryAPI(baseURL),
  productAPI: new ProductAPI(baseURL),
  userAPI: new UserAPI(baseURL),
};

export default apis;

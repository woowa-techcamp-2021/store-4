import CategoryAPI from './category';
import DeliveryAddressAPI from './deliveryAddress';
import ProductAPI from './product';
import UserAPI from './user';
import ReviewAPI from './review';
import OrderAPI from './order';

const baseURL = process.env.SERVER_URL as string;

const apis = {
  categoryAPI: new CategoryAPI(baseURL),
  productAPI: new ProductAPI(baseURL),
  userAPI: new UserAPI(baseURL),
  reviewAPI: new ReviewAPI(baseURL),
  deliveryAddressAPI: new DeliveryAddressAPI(baseURL),
  orderAPI: new OrderAPI(baseURL),
};

export default apis;

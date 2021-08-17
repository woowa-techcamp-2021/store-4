import CategoryAPI from './category';

const baseURL = process.env.SERVER_URL as string;

const apis = {
  categoryAPI: new CategoryAPI(baseURL),
};

export default apis;

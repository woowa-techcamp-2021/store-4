import Product from '../models/product';

export type Wish = {
  id: number;
  productId: number;
  title: string;
  imgSrc: string;
};

export type WishResponse = {
  id: number;
  product: Product;
};

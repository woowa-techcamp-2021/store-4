import Product from '../models/product';

export type ProductResponse = {
  products: Product[];
  totalPages: number;
};

export type ProductListResponseType = {
  totalProductCount: number;
  totalPage: number;
  productList: ProductItemType[];
};

export type ProductItemType = {
  id: number;
  name: string;
  price: number;
  point: number;
  uploadDate: string;
  imgSrc: string;
};

export enum ProductListOrder {
  Recommend,
  Popularity,
  Recent,
  PriceLow,
  PriceHigh,
}

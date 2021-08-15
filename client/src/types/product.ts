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
  Popularity,
  Recent,
  PriceLow,
  PriceHigh,
}

export type ProductItemType = {
  id: number;
  name: string;
  price: number;
  point: number;
  uploadDate: string;
  imgSrc: string;
};

export enum Order {
  popularity,
  recent,
  priceLow,
  priceHigh,
}

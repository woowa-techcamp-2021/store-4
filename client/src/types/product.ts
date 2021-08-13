export type ProductItemPropsType = {
  name: string;
  price: number;
  imgSrc: string;
};

export type ProductItemType = {
  Id: number;
  Name: string;
  Price: number;
  Point: number;
  UploadDate: string;
  ImgSrc: string;
};

export enum Order {
  Popularity,
  Recent,
  PriceLow,
  PriceHigh,
}


import ProductOption from '../models/product-option';
import ProductSelect from '../models/product-select';
import Product from '../models/product';

export type ProductResponse = {
  products: Product[];
  totalPages: number;
  totalProductCount: number;
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

export type SelectWithSelected = ProductSelect & {
  selectedOption: ProductOption | null;
};

export type OptionWithSelected = ProductOption & {
  selected: boolean;
};

export enum ProductListOrder {
  Recommend = 'recommend',
  Popularity = 'popularity',
  Recent = 'recent',
  PriceLow = 'priceLow',
  PriceHigh = 'priceHigh',
}

export type CartType = 'single' | 'multi';

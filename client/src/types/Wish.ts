import { CartOptions } from './cart';

export type Wish = {
  id: number;
  title: string;
  imgSrc: string;
  defaultPrice: number;
  count: number;
  checked: boolean;
  options?: CartOptions[];
};

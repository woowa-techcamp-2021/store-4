import { ProductListOrder } from '../types/product';

export type Option = {
  category: number | null;
  sort: ProductListOrder;
  pageNum: number;
  searchTerm: string | null;
};

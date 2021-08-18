import { ProductListOrder } from '../types/product';

export type Option = {
  categoryId?: number;
  sortOption: ProductListOrder;
  pageNum: number;
  searchTerm?: string;
};

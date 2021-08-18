import { ProductListOrder } from '../types/product';

export type Option = {
  categoryId: number | null;
  sortOption: ProductListOrder;
  pageNum: number;
  searchTerm: string | null;
};

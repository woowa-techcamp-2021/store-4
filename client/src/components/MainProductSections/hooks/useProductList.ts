import { useState, useEffect } from 'react';
import Product from '../../../models/product';
import productStore from '../../../stores/productStore';
import { ProductListOrder } from '../../../types/product';

export const useProductList = (): Product[] => {
  const [productList, setProductList] = useState([] as Product[]);

  useEffect(() => {
    productStore
      .fetchProducts({
        category: null,
        sort: ProductListOrder.Recommend,
        pageNum: 1,
        searchTerm: null,
      })
      .then(({ products }) => setProductList(products));
  }, []);

  return productList;
};

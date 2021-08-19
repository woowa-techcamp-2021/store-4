import { useState, useEffect } from 'react';
import apis from '../../../api';
import Product from '../../../models/product';
import { ProductListOrder } from '../../../types/product';

export const useProductList = (): Product[] => {
  const [productList, setProductList] = useState([] as Product[]);

  useEffect(() => {
    apis.productAPI
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

import { useState, useEffect } from 'react';
import { getProductList, MockProductItemType } from '../mock';

export const useProductList = (): MockProductItemType[] => {
  const [productList, setProductList] = useState([] as MockProductItemType[]);

  useEffect(() => {
    getProductList().then((data) => setProductList(data));
  }, []);

  return productList;
};

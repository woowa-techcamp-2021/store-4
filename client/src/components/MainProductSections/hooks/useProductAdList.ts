import { useState, useEffect } from 'react';
import { getAdProductList, MockProductAdItemType } from '../mock';

export const useProductList = (): MockProductAdItemType[] => {
  const [productList, setProductList] = useState([] as MockProductAdItemType[]);

  useEffect(() => {
    getAdProductList().then((data) => setProductList(data));
  }, []);

  return productList;
};

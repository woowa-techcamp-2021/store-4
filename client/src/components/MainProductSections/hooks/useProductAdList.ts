import { useState, useEffect } from 'react';
import { getAdProductList, MockProductAdItemType } from '../mock';

export const useProductAdList = (): MockProductAdItemType[] => {
  const [productList, setProductList] = useState([] as MockProductAdItemType[]);

  useEffect(() => {
    getAdProductList().then((data) => setProductList(data));
  }, []);

  return productList;
};

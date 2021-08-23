import { useState, useEffect } from 'react';
import { getAdProductList, MockProductAdItemType } from '../components/MainProductSections/mock';

export const useMainAdProductList = (): MockProductAdItemType[] => {
  const [mainAdproducts, setmainAdProducts] = useState([] as MockProductAdItemType[]);

  useEffect(() => {
    getAdProductList().then((data) => setmainAdProducts(data));
  }, []);

  return mainAdproducts;
};

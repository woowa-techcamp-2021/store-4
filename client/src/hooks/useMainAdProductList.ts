import { useState, useEffect } from 'react';
import { getAdProductList, MockProductAdItemType } from '../components/MainProductSections/mock';

export const useMainAdProductList = (): MockProductAdItemType[] => {
  const [mainAdproducts, setMainAdProducts] = useState<MockProductAdItemType[]>([]);

  useEffect(() => {
    getAdProductList().then((data) => setMainAdProducts(data));
  }, []);

  return mainAdproducts;
};

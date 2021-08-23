import { useState, useEffect } from 'react';
import productStore from '../stores/productStore';
import { MainProducts } from '../types/product';

const DEFAULT_PRODUCT_LIST: MainProducts = {
  discountingProducts: [],
  popularProducts: [],
  newProducts: [],
};

export const useMainProductList = (): [MainProducts] => {
  const [mainProducts, setMainProducts] = useState(DEFAULT_PRODUCT_LIST);

  const fetchMainProducts = async () => {
    const { discountingProducts, popularProducts, newProducts } =
      await productStore.fetchMainProducts();

    setMainProducts({
      discountingProducts,
      popularProducts,
      newProducts,
    });
  };

  useEffect(() => {
    fetchMainProducts();
  }, []);

  return [mainProducts];
};

import { useState, useEffect, useCallback } from 'react';
import { useHistory } from '../lib/router';
import productStore from '../stores/productStore';
import { MainProducts } from '../types/product';

const DEFAULT_PRODUCT_LIST: MainProducts = {
  discountingProducts: [],
  popularProducts: [],
  newProducts: [],
};

export const useMainProductList = (): MainProducts => {
  const [mainProducts, setMainProducts] = useState(DEFAULT_PRODUCT_LIST);
  const history = useHistory();

  const fetchMainProducts = useCallback(async () => {
    try {
      const { discountingProducts, popularProducts, newProducts } =
        await productStore.fetchMainProducts();

      setMainProducts({
        discountingProducts,
        popularProducts,
        newProducts,
      });
    } catch (error) {
      history.push('/error');
    }
  }, [history]);

  useEffect(() => {
    fetchMainProducts();
  }, [fetchMainProducts]);

  return mainProducts;
};

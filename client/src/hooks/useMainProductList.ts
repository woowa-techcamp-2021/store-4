import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { useHistory } from '../lib/router';
import Product from '../models/product';
import productStore from '../stores/productStore';

type UseMainProductList = [Product[], Dispatch<SetStateAction<Product[]>>][];

export const useMainProductList = (): UseMainProductList => {
  const [discountingProducts, setDiscountingProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const history = useHistory();

  const fetchMainProducts = useCallback(async () => {
    try {
      const products = await productStore.fetchMainProducts();

      setDiscountingProducts(products.discountingProducts);
      setPopularProducts(products.popularProducts);
      setNewProducts(products.newProducts);
    } catch (error) {
      history.push('/error');
    }
  }, [history]);

  useEffect(() => {
    fetchMainProducts();
  }, [fetchMainProducts]);

  return [
    [discountingProducts, setDiscountingProducts],
    [popularProducts, setPopularProducts],
    [newProducts, setNewProducts],
  ];
};

import { useEffect, useState } from 'react';
import { useParams } from '../lib/router';
import Product from '../models/product';
import productDetailStore from '../stores/productDetailStore';
import { isNumber } from '../utils/typeGuard';

const useDetailProduct = (): [Product | null, number | null] => {
  const { id } = useParams();
  const [error, setError] = useState<number | null>(null);

  useEffect(() => {
    if (!isNumber(id)) {
      return;
    }

    productDetailStore.fetchProduct(+id).catch((error) => {
      setError(error.status);
    });

    return () => {
      productDetailStore.resetProduct();
    };
  }, [id]);

  return [productDetailStore.product, error];
};

export default useDetailProduct;

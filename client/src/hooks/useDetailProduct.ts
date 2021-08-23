import { useEffect } from 'react';
import { useParams } from '../lib/router';
import Product from '../models/product';
import productDetailStore from '../stores/productDetailStore';
import { isNumber } from '../utils/typeGuard';

const useDetailProduct = (): Product | null => {
  const { id } = useParams();

  useEffect(() => {
    if (!isNumber(id)) {
      return;
    }

    console.log(id);
    productDetailStore.fetchProduct(+id);
  }, [id]);

  return productDetailStore.product;
};

export default useDetailProduct;

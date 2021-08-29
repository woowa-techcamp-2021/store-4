import React, { useEffect } from 'react';
import ProductListContainer from '../containers/ProductListContainer';

const ProductsPage = (): React.ReactElement => {
  useEffect(() => {
    scrollTo({ top: 0 });
  });
  return <ProductListContainer />;
};

export default ProductsPage;

import React from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import ProductDetailContainer from '../containers/ProductDetailContainer';

const Container = styled.div``;

const ProductPage = (): React.ReactElement => {
  useEffect(() => {
    scrollTo({ top: 0 });
  }, []);

  return (
    <Container>
      <ProductDetailContainer />
    </Container>
  );
};

export default ProductPage;

import React from 'react';
import styled from 'styled-components';
import ProductDetailContainer from '../containers/ProductDetailContainer';

const Container = styled.div``;

const ProductPage = (): React.ReactElement => {
  return (
    <Container>
      <ProductDetailContainer />
    </Container>
  );
};

export default ProductPage;

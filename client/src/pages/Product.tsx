import React from 'react';
import styled from 'styled-components';
import ProductDetailContainer from '../containers/ProductDetailContainer';
import ReviewConatiner from '../containers/ReviewContainer';

const Container = styled.div``;

const ProductPage = (): React.ReactElement => {
  return (
    <Container>
      <ProductDetailContainer />
      <ReviewConatiner />
    </Container>
  );
};

export default ProductPage;

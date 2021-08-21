import React from 'react';
import styled from 'styled-components';
import MainProductSections from '../components/MainProductSections/MainProductSections';
import ProductDetailImages from '../components/ProductDetail/ProductDetailImages';
import ProductInfoBox from '../components/ProductDetail/ProductInfoBox';
import CarouselContainer from '../containers/CarouselContainer';
import ProductDetailContainer from '../containers/ProductDetailContainer';
import Product from '../models/product';

const Container = styled.div`
  margin: 80px;
`;

const HomePage = (): React.ReactElement => {
  return (
    <Container>
      {/* <ProductDetailImages
        images={[
          'https://m.anderssonbell.com/web/product/tiny/202105/ccb7f982e6d5f51703eb2cfe98dd8b1a.jpg',
          'https://m.anderssonbell.com/web/product/tiny/202104/cc0078e6d2470e62ac42d0380b096352.jpg',
          'https://m.anderssonbell.com/web/product/tiny/202105/3fb7a3fd1ecf1cc9045464a183c856d6.jpg',
        ]}
      /> */}
      <ProductDetailContainer />
      {/* <CarouselContainer />
      <MainProductSections /> */}
    </Container>
  );
};

export default HomePage;

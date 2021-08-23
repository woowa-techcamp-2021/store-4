import React from 'react';
import styled from 'styled-components';
import MainProductSections from '../components/MainProductSections/MainProductSections';
import CarouselContainer from '../containers/CarouselContainer';
import ManageDeliveryAddressContainer from '../containers/ManageDeliveryAddressContainer';

const Container = styled.div``;

const HomePage = (): React.ReactElement => {
  return (
    <Container>
      {/* <CarouselContainer />
      <MainProductSections /> */}
      <ManageDeliveryAddressContainer />
    </Container>
  );
};

export default HomePage;

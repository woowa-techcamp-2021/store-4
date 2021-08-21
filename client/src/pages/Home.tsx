import React from 'react';
import styled from 'styled-components';
import MainProductSections from '../components/MainProductSections/MainProductSections';
import CarouselContainer from '../containers/CarouselContainer';

const Container = styled.div``;

const HomePage = (): React.ReactElement => {
  return (
    <Container>
      <CarouselContainer />
      <MainProductSections />
    </Container>
  );
};

export default HomePage;

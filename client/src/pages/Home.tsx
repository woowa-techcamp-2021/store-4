import React from 'react';
import styled from 'styled-components';
import CarouselContainer from '../containers/CarouselContainer';
import MainProductSectionsContainer from '../containers/MainProductSectionsContainer';

const Container = styled.div``;

const HomePage = (): React.ReactElement => {
  return (
    <Container>
      <CarouselContainer />
      <MainProductSectionsContainer />
    </Container>
  );
};

export default HomePage;

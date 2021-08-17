import React from 'react';
import styled from 'styled-components';
import { MockProductAdItemType } from '../mock';
import MainAdListItem from './MainAdListItem';

const MainAdListContainer = styled.div``;

const MainAdTitle = styled.div`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const MainAdListItemsWrapper = styled.div``;

type MainAdListProps = {
  title: string;
  products: MockProductAdItemType[];
};

const MainAdList = (props: MainAdListProps): JSX.Element => {
  const { title, products } = props;
  const MainAdListItems = products.map((product) => (
    <MainAdListItem key={product.id} {...product} />
  ));
  return (
    <MainAdListContainer>
      <MainAdTitle>{title}</MainAdTitle>
      <MainAdListItemsWrapper>{MainAdListItems}</MainAdListItemsWrapper>
    </MainAdListContainer>
  );
};

export default MainAdList;

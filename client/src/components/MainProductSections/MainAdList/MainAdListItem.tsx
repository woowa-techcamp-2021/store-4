import React from 'react';
import styled from 'styled-components';
import { MockProductItemType } from '../mock';

const MainAdListItemContainer = styled.div``;

const ImageWrapper = styled.div``;

const AdImage = styled.img``;

const ItemTitles = styled.div``;

const Title = styled.div``;

const SubTitle = styled.div``;

type MainAddListItemProps = {
  listTitle: string;
  title: string;
  subTitle: string;
  product: MockProductItemType;
};

const MainAdListItem = (props: MainAddListItemProps): JSX.Element => {
  const { title, subTitle, product } = props;
  return (
    <MainAdListItemContainer>
      <ImageWrapper>
        <AdImage src={product.imgSrc} />
      </ImageWrapper>
      <ItemTitles>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
      </ItemTitles>
    </MainAdListItemContainer>
  );
};

export default MainAdListItem;

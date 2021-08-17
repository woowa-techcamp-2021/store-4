import React from 'react';
import styled from 'styled-components';
import { MockProductAdItemType } from '../mock';

const MainAdListItemContainer = styled.div`
  display: flex;
`;

const ImageWrapper = styled.div``;

const AdImage = styled.img``;

const ItemTitles = styled.div`
  padding: 16px;
`;

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 6px;
`;

const SubTitle = styled.div`
  font-size: 14px;
`;

type MainAddListItemProps = {
  product: MockProductAdItemType;
};

const MainAdListItem = (props: MainAddListItemProps): JSX.Element => {
  const { title, subTitle, imgSrc } = props.product;
  return (
    <MainAdListItemContainer>
      <ImageWrapper>
        <AdImage src={imgSrc} />
      </ImageWrapper>
      <ItemTitles>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
      </ItemTitles>
    </MainAdListItemContainer>
  );
};

export default MainAdListItem;

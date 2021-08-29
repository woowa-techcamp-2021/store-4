import React from 'react';
import styled from 'styled-components';
import { Link } from '../../../lib/router';
import LazyImage from '../../LazyImage/LazyImage';
import { MockProductAdItemType } from '../mock';

const MainAdListItemContainer = styled.div`
  display: flex;
`;

const ImageWrapper = styled.div``;

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
  const { id, title, subTitle, imgSrc } = props.product;

  return (
    <Link to={`/product/${id}`}>
      <MainAdListItemContainer>
        <ImageWrapper>
          <LazyImage width={900} aspectRatio={[3, 1]} src={imgSrc} alt="상품 이미지" />
        </ImageWrapper>
        <ItemTitles>
          <Title>{title}</Title>
          <SubTitle>{subTitle}</SubTitle>
        </ItemTitles>
      </MainAdListItemContainer>
    </Link>
  );
};

export default MainAdListItem;

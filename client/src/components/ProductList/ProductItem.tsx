import React from 'react';
import { getKoreanMoneyFormat } from '../../utils/moneyFormater';
import styled from 'styled-components';

export type ProductItemProps = {
  name: string;
  price: number;
  imgSrc: string;
};

const ProductItemContainer = styled.li`
  list-style: none;

  box-sizing: border-box;
  width: 300px;

  padding: 0 10px;
  margin: 20px 0;
`;

const Img = styled.img`
  width: 100%;
`;

const Name = styled.div``;
const Price = styled.div``;

const ProductItem = ({ name, price, imgSrc }: ProductItemProps): React.ReactElement => {
  return (
    <ProductItemContainer>
      <Img src={imgSrc}></Img>
      <Name>{name}</Name>
      <Price>{getKoreanMoneyFormat(price)}</Price>
    </ProductItemContainer>
  );
};

export default ProductItem;

import React from 'react';
import { ProductItemPropsType } from '../../types/product';
import { getKoreanMoneyFormat } from '../../utils/moneyFormater';

import styled from 'styled-components';

const ProductItem = ({ name, price, imgSrc }: ProductItemPropsType): React.ReactElement => {
  const ProductItem = styled.li`
    box-sizing: border-box;
    width: 300px;

    padding: 0 10px;
    margin: 20px 0;

    list-style: none;
  `;

  const Img = styled.img`
    width: 100%;
  `;

  const Name = styled.div``;
  const Price = styled.div``;

  return (
    <ProductItem>
      <Img src={imgSrc}></Img>
      <Name>{name}</Name>
      <Price>{getKoreanMoneyFormat(price)}</Price>
    </ProductItem>
  );
};

export default ProductItem;

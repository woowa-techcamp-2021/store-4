import React from 'react';
import { ProductItemType } from '../../types/product';

import styled from 'styled-components';

const ProductItem = ({
  name,
  price,
  uploadDate,
  point,
  imgSrc,
}: ProductItemType): React.ReactElement => {
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
      <Price>{price.toLocaleString()}원</Price>
      <div>{uploadDate}(디버깅)</div>
      <div>평점: {point} (디버깅)</div>
    </ProductItem>
  );
};

export default ProductItem;

import React from 'react';
import { toKoreanMoneyFormat } from '../../utils/moneyFormater';
import styled from 'styled-components';
import { Link } from '../../lib/router';

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

type Props = {
  id: number;
  name: string;
  price: number;
  // imgSrc: string;
};

const ProductItem = (props: Props): React.ReactElement => {
  const { id, name, price } = props;
  return (
    <Link to={`/product/${id}`}>
      <ProductItemContainer>
        {/* <Img src={imgSrc}></Img> */}
        <Name>{name}</Name>
        <Price>{toKoreanMoneyFormat(price)}</Price>
      </ProductItemContainer>
    </Link>
  );
};

export default ProductItem;

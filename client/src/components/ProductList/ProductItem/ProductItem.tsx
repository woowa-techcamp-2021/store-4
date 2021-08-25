import React from 'react';
import styled from 'styled-components';
import { Link } from '../../../lib/router';
import Product from '../../../models/product';
import ProductItemDescription from './ProductItemDescription';
import ProductItemImage from './ProductItemImage';

const ProductItemContainer = styled.li`
  list-style: none;

  box-sizing: border-box;
  width: 280px;
  margin-bottom: 32px;
`;

type Props = {
  product: Product;
};

const ProductItem = (props: Props): React.ReactElement => {
  const { product } = props;
  const {
    id,
    name,
    price,
    thumbnail,
    discountRate,
    isDiscounting,
    discountedPrice,
    isNew,
    isWished,
  } = product;

  return (
    <Link to={`/product/${id}`}>
      <ProductItemContainer>
        <ProductItemImage
          thumbnail={thumbnail}
          isNew={isNew}
          isWished={isWished}
          isDiscounting={isDiscounting}
        />
        <ProductItemDescription
          name={name}
          price={price}
          discountRate={discountRate}
          isDiscounting={isDiscounting}
          discountedPrice={discountedPrice}
        />
      </ProductItemContainer>
    </Link>
  );
};

export default ProductItem;

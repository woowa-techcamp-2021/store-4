import React, { MouseEventHandler } from 'react';
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
  onWishClick: MouseEventHandler;
};

const ProductItem = (props: Props): JSX.Element => {
  const { product, onWishClick } = props;
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
    <ProductItemContainer>
      <Link to={`/product/${id}`}>
        <ProductItemImage
          onWishClick={onWishClick}
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
      </Link>
    </ProductItemContainer>
  );
};

export default ProductItem;

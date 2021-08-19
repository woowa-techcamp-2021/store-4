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
  const { id, name, price, thumbnail, discountRate, isDiscountRate, discountedPrice, isNew } =
    product;

  return (
    <Link to={`/product/${id}`}>
      <ProductItemContainer>
        <ProductItemImage thumbnail={thumbnail} isNew={isNew} isDiscountRate={isDiscountRate} />
        <ProductItemDescription
          name={name}
          price={price}
          discountRate={discountRate}
          isDiscountRate={isDiscountRate}
          discountedPrice={discountedPrice}
        />
      </ProductItemContainer>
    </Link>
  );
};

export default ProductItem;

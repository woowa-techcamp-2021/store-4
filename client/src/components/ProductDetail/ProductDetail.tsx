import React, { useMemo } from 'react';
import { ChangeEventHandler, FocusEventHandler, MouseEventHandler } from 'react';
import styled from 'styled-components';
import CartInProduct from '../../models/cart-in-product';
import Product from '../../models/product';
import { CartType, SelectWithSelected } from '../../types/product';
import ProductDetailImages from './ProductDetailImages';
import ProductInfoBox from './ProductInfoBox';

const Container = styled.div`
  margin: 40px auto;
  display: flex;
  justify-content: space-between;
  width: ${(props) => props.theme.device.desktop};
`;

const SkeletonUI = styled.div``;

type Props = {
  cartType: CartType;
  cartsInProduct: CartInProduct[];
  product: Product | null;
  selectsWithSelected: SelectWithSelected[];
  getSelectChangeHandler: (selectWithSelected: SelectWithSelected) => ChangeEventHandler;
  getCountChangeHandler: (cartInProduct: CartInProduct) => ChangeEventHandler;
  getCountBlurHandler: (cartInProduct: CartInProduct) => FocusEventHandler;
  getIncreaseCartHandler: (cartInProduct: CartInProduct) => MouseEventHandler;
  getDecreaseCartHandler: (cartInProduct: CartInProduct) => MouseEventHandler;
  getRemoveCartHandler: (cartInProduct: CartInProduct) => MouseEventHandler;
};

const ProductDetail = (props: Props): JSX.Element => {
  const { product } = props;

  const productImages = useMemo((): string[] => {
    if (product === null) {
      return [];
    }

    return product.productImages.map((productImage) => productImage.url);
  }, [product]);

  if (product === null) {
    return <SkeletonUI />;
  }

  return (
    <Container>
      <ProductDetailImages images={productImages} />
      <ProductInfoBox {...props} product={product} />
    </Container>
  );
};

export default ProductDetail;

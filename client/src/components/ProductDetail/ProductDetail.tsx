import React, { useMemo } from 'react';
import { ChangeEventHandler, FocusEventHandler, MouseEventHandler } from 'react';
import styled from 'styled-components';
import CartInProduct from '../../models/cart-in-product';
import Product from '../../models/product';
import { CartType, SelectWithSelected } from '../../types/product';
import ProductDetailImages from './ProductImage/ProductDetailImages';
import ProductDetailSkeleton from './ProductDetailSkeleton';
import ProductInfoBox from './ProductInfoBox';

const Container = styled.div`
  margin: 40px auto;
  width: ${(props) => props.theme.device.desktop};
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductContentWrapper = styled.div`
  width: 100%;
  margin: 50px 0px;
`;

const ProductContentTitle = styled.h1`
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.color.grey1};
  font-size: ${(props) => props.theme.fontSize.large};
`;

const ProductContent = styled.div`
  width: fit-content;
  margin: 40px auto;
`;

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
  onWishClick: MouseEventHandler;
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
    return <ProductDetailSkeleton />;
  }

  return (
    <Container>
      <ProductInfoWrapper>
        <ProductDetailImages images={productImages} />
        <ProductInfoBox {...props} product={product} />
      </ProductInfoWrapper>
      <ProductContentWrapper>
        <ProductContentTitle>상품설명</ProductContentTitle>
        <ProductContent dangerouslySetInnerHTML={{ __html: product.content }} />
      </ProductContentWrapper>
    </Container>
  );
};

export default ProductDetail;

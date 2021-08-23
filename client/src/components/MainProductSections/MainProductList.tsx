import React from 'react';
import styled from 'styled-components';
import Product from '../../models/product';
import ProductItem from '../ProductList/ProductItem/ProductItem';

const ProductList = styled.div``;

const ProductListTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: ${(props) => props.theme.fontSize.large};
  font-weight: 700;
  margin: 32px 0px;
`;

const ProductItemWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  flex-wrap: wrap;
`;

const EmptyProductList = styled.div``;

type MainProductListProps = {
  title: string;
  products: Product[];
};

const NO_PRODUCT_ITEMS_IN_LIST_TEXT = '상품이 없습니다.';

const MainProductList = (props: MainProductListProps): JSX.Element => {
  const { title, products } = props;

  const ProductItems = products.map((product) => (
    <ProductItem key={product.id} product={product} />
  ));

  return (
    <ProductList>
      <ProductListTitle>{title}</ProductListTitle>
      {ProductItems.length === 0 ? (
        <EmptyProductList>{NO_PRODUCT_ITEMS_IN_LIST_TEXT}</EmptyProductList>
      ) : (
        <ProductItemWrapper>{ProductItems}</ProductItemWrapper>
      )}
    </ProductList>
  );
};

export default MainProductList;

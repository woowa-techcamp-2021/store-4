import React, { MouseEventHandler } from 'react';
import ProductItem from './ProductItem/ProductItem';
import styled from 'styled-components';
import Product from '../../models/product';
import { SortButton } from '../../containers/ProductListContainer';
import { ProductListOrder } from '../../types/product';
import ProductListHeader from './ProductListHeader';
import PageNav from './PageNav';
import EmptyProducts from './EmptyProducts';

const Container = styled.div`
  width: ${(props) => props.theme.device.desktop};
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductListWrapper = styled.ul`
  width: 1200px;

  display: flex;
  flex-wrap: wrap;
  gap: 24px;

  padding: 0;
`;

type Props = {
  products: Product[];
  buttons: SortButton[];
  totalProductCount: number;
  totalPageCount: number;
  currentPage: number;
  searchTerm: string | null;
  onClickSortButton: (option: ProductListOrder) => () => void;
  onClickPageNum: (pageNum: number) => () => void;
  getWishClickHandler: (product: Product) => MouseEventHandler;
};

const ProductList = (props: Props): JSX.Element => {
  const {
    products,
    buttons,
    totalProductCount,
    totalPageCount,
    currentPage,
    searchTerm,
    onClickSortButton,
    onClickPageNum,
    getWishClickHandler,
  } = props;

  const ProductItems = products.map((product) => (
    <ProductItem key={product.id} product={product} onWishClick={getWishClickHandler(product)} />
  ));

  return (
    <Container>
      <ProductListHeader
        searchTerm={searchTerm}
        buttons={buttons}
        totalProductCount={totalProductCount}
        onClickSortButton={onClickSortButton}
      />
      {ProductItems.length <= 0 ? (
        <EmptyProducts />
      ) : (
        <ProductListWrapper>{ProductItems}</ProductListWrapper>
      )}
      <PageNav
        currentPage={currentPage}
        totalPageCount={totalPageCount}
        onClickPageNum={onClickPageNum}
      />
    </Container>
  );
};

export default ProductList;

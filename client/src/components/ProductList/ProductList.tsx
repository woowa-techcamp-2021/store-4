import React, { MouseEventHandler } from 'react';
import ProductItem from './ProductItem/ProductItem';
import styled from 'styled-components';
import Product from '../../models/product';
import { SortButton } from '../../containers/ProductListContainer';
import { ProductListOrder } from '../../types/product';
import { range } from '../../utils/range';
import ProductListHeader from './ProductListHeader';

const Container = styled.div`
  width: 1200px;
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

const PageNav = styled.ul`
  list-style: none;

  display: flex;
  justify-content: center;

  padding: 0;
`;

type PageNavItemProps = {
  isSelected: boolean;
};

const PageNavItem = styled.li<PageNavItemProps>`
  padding: 5px;
  color: ${(props) => (props.isSelected ? props.theme.color.black : props.theme.color.grey4)};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.color.black};
  }
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

  const PageNavItems = range(totalPageCount).map((index) => {
    const pageNum = index + 1;
    return (
      <PageNavItem
        key={pageNum}
        isSelected={currentPage === pageNum}
        onClick={onClickPageNum(pageNum)}
        data-testid={`pageNav${pageNum}`}
      >
        {pageNum}
      </PageNavItem>
    );
  });

  return (
    <Container>
      <ProductListHeader
        searchTerm={searchTerm}
        buttons={buttons}
        totalProductCount={totalProductCount}
        onClickSortButton={onClickSortButton}
      />
      <ProductListWrapper>{ProductItems}</ProductListWrapper>
      <PageNav>{PageNavItems}</PageNav>
    </Container>
  );
};

export default ProductList;

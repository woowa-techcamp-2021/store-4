import React from 'react';
import ProductItem from './ProductItem';
import styled from 'styled-components';
import SortButtonList from './SortButtonList';
import Product from '../../models/product';
import { SortButton } from '../../containers/ProductListContainer';
import { ProductListOrder } from '../../types/product';
import { range } from '../../utils/range';

const Container = styled.div`
  width: 1200px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ListHeader = styled.div`
  box-sizing: border-box;
  width: 1200px;

  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;

const TotalCount = styled.div``;

const ProductListWrapper = styled.ul`
  width: 1200px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

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
  onClickSortButton: (option: ProductListOrder) => () => void;
  onClickPageNum: (pageNum: number) => () => void;
};

const ProductList = (props: Props): JSX.Element => {
  const {
    products,
    buttons,
    totalProductCount,
    totalPageCount,
    currentPage,
    onClickSortButton,
    onClickPageNum,
  } = props;

  const ProductItems = products.map((product) => (
    <ProductItem key={product.id} product={product} />
  ));

  const PageNavItems = range(totalPageCount).map((index) => {
    const pageNum = index + 1;
    return (
      <PageNavItem
        key={pageNum}
        isSelected={currentPage === pageNum}
        onClick={onClickPageNum(pageNum)}
      >
        {pageNum}
      </PageNavItem>
    );
  });

  return (
    <Container>
      <ListHeader>
        <TotalCount>총 {totalProductCount}개</TotalCount>
        <SortButtonList buttons={buttons} onClickSortButton={onClickSortButton} />
      </ListHeader>
      <ProductListWrapper>{ProductItems}</ProductListWrapper>
      <PageNav>{PageNavItems}</PageNav>
    </Container>
  );
};

export default ProductList;

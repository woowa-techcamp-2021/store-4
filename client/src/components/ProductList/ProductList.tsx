import React, { useEffect, useRef, useState, useCallback } from 'react';
import ProductItem from './ProductItem';
import { apiMock } from './mock/api';
import { ProductItemType, ProductListOrder } from '../../types/product';

import styled from 'styled-components';

const Main = styled.div`
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

  padding: 0;
`;

const SortButtonList = styled.div``;
const SortButton = styled.button``;

const PageNav = styled.ul`
  list-style: none;

  display: flex;
  justify-content: center;

  padding: 0;
`;
const PageNavItem = styled.li`
  padding: 5px;

  cursor: pointer;
`;

const ProductList = (): React.ReactElement => {
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [productList, setProductList] = useState<ProductItemType[]>([]);

  const currentPage = useRef(1);
  const listOrder = useRef(ProductListOrder.Recent);

  const fetchProductList = useCallback(() => {
    const resData = apiMock.getProductList(listOrder.current, currentPage.current);
    setTotalProductCount(resData.totalProductCount);
    setTotalPage(resData.totalPage);
    setProductList(resData.productList);
  }, []);

  useEffect(() => {
    fetchProductList();
  }, []);

  const onClickSortButton = (order: ProductListOrder) => (): void => {
    listOrder.current = order;
    const resData = apiMock.getProductList(listOrder.current, currentPage.current);
    setProductList(resData.productList);
  };

  const onClickPageButton = (pageNum: number) => (): void => {
    currentPage.current = pageNum;
    const resData = apiMock.getProductList(listOrder.current, currentPage.current);
    setProductList(resData.productList);
  };

  const ProductItemList = productList.map((product) => (
    <ProductItem
      key={product.Id}
      name={product.Name}
      price={product.Price}
      imgSrc={product.ImgSrc}
    ></ProductItem>
  ));

  return (
    <Main>
      <ListHeader>
        <TotalCount>총 {totalProductCount}개</TotalCount>
        <SortButtonList>
          <SortButton onClick={onClickSortButton(ProductListOrder.Popularity)}>인기순</SortButton>
          <SortButton onClick={onClickSortButton(ProductListOrder.Recent)}>최신순</SortButton>
          <SortButton onClick={onClickSortButton(ProductListOrder.PriceLow)}>낮은가격순</SortButton>
          <SortButton onClick={onClickSortButton(ProductListOrder.PriceHigh)}>
            높은가격순
          </SortButton>
        </SortButtonList>
      </ListHeader>
      <ProductListWrapper>{ProductItemList}</ProductListWrapper>
      <PageNav>
        {createPageNumbers(totalPage).map((pageNum) => {
          return (
            <PageNavItem key={pageNum} onClick={onClickPageButton(pageNum)}>
              {pageNum}
            </PageNavItem>
          );
        })}
      </PageNav>
    </Main>
  );
};

const createPageNumbers = (totalPage: number): number[] => {
  const pageNumbers = [];
  for (let num = 1; num <= totalPage; num++) {
    pageNumbers.push(num);
  }
  return pageNumbers;
};

export default ProductList;

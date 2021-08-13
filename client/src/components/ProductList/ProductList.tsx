import React, { useEffect, useRef, useState } from 'react';
import ProductItem from './ProductItem';
import { apiMock } from './ProductMock';
import { ProductItemType, Order } from '../../types/product';

import styled from 'styled-components';

const Main = styled.div`
  width: 1200px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ListHeader = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;

  box-sizing: border-box;
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
  const totalProductCount = useRef(0);
  const totalPage = useRef(1);
  const currentPage = useRef(1);
  const listOrder = useRef(Order.recent);
  const [productList, setProductList] = useState<ProductItemType[]>([]);

  useEffect(() => {
    function fetchProductList() {
      const resData = apiMock.getProductList(listOrder.current, currentPage.current);
      totalProductCount.current = resData.totalProductCount;
      totalPage.current = resData.totalPage;
      setProductList(resData.productList);
    }
    fetchProductList();
  }, []);

  const onClickSortButton = (order: Order) => (): void => {
    listOrder.current = order;
    const resData = apiMock.getProductList(listOrder.current, currentPage.current);
    setProductList(resData.productList);
  };

  const onClickPageButton = (pageNum: number): void => {
    currentPage.current = pageNum;
    const resData = apiMock.getProductList(listOrder.current, currentPage.current);
    setProductList(resData.productList);
  };

  return (
    <Main>
      <ListHeader>
        <TotalCount>총 {totalProductCount.current}개</TotalCount>
        <SortButtonList>
          <SortButton onClick={onClickSortButton(Order.popularity)}>인기순</SortButton>
          <SortButton onClick={onClickSortButton(Order.recent)}>최신순</SortButton>
          <SortButton onClick={onClickSortButton(Order.priceLow)}>낮은가격순</SortButton>
          <SortButton onClick={onClickSortButton(Order.priceHigh)}>높은가격순</SortButton>
        </SortButtonList>
      </ListHeader>
      <ProductListWrapper>
        {productList.map((product) => (
          <ProductItem
            key={product.id}
            name={product.name}
            price={product.price}
            imgSrc={product.imgSrc}
          ></ProductItem>
        ))}
      </ProductListWrapper>
      <PageNav>
        {createPageNumbers(totalPage.current).map((pageNum) => {
          return (
            <PageNavItem
              key={pageNum}
              onClick={() => {
                onClickPageButton(pageNum);
              }}
            >
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

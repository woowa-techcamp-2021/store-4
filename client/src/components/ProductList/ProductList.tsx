import React, { useEffect, useState, useCallback } from 'react';
import ProductItemContainer from './ProductItem';
import { apiMock } from './mock/api';
import { ProductListResponseType, ProductListOrder } from '../../types/product';
import { range } from '../../utils/range';

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
  const [productListResponse, setProductListResponse] = useState<ProductListResponseType | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [listOrder, setListOrder] = useState(ProductListOrder.Recent);

  const fetchProductList = useCallback(() => {
    const resData = apiMock.getProductList(listOrder, currentPage);
    setProductListResponse(resData);
  }, [currentPage, listOrder]);

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList, currentPage, listOrder]);

  const onClickSortButton = (order: ProductListOrder) => (): void => {
    setListOrder(order);
  };

  const onClickPageButton = (pageNum: number) => (): void => {
    setCurrentPage(pageNum);
  };

  const productItemList = productListResponse?.productList.map((product) => (
    <ProductItemContainer
      key={product.id}
      id={product.id}
      name={product.name}
      price={product.price}
      imgSrc={product.imgSrc}
    ></ProductItemContainer>
  ));

  const pageNavItem = () => {
    if (productListResponse === null) return <></>;
    return range(productListResponse.totalPage).map((index) => {
      const pageNum = index + 1;
      return (
        <PageNavItem key={pageNum} onClick={onClickPageButton(pageNum)}>
          {pageNum}
        </PageNavItem>
      );
    });
  };

  return (
    <>
      {productListResponse === null ? (
        <div>로딩중..</div>
      ) : (
        <Main>
          <ListHeader>
            <TotalCount>총 {productListResponse.totalProductCount}개</TotalCount>
            <SortButtonList>
              <SortButton onClick={onClickSortButton(ProductListOrder.Popularity)}>
                인기순
              </SortButton>
              <SortButton onClick={onClickSortButton(ProductListOrder.Recent)}>최신순</SortButton>
              <SortButton onClick={onClickSortButton(ProductListOrder.PriceLow)}>
                낮은가격순
              </SortButton>
              <SortButton onClick={onClickSortButton(ProductListOrder.PriceHigh)}>
                높은가격순
              </SortButton>
            </SortButtonList>
          </ListHeader>
          <ProductListWrapper>{productItemList}</ProductListWrapper>
          <PageNav>{pageNavItem()}</PageNav>
        </Main>
      )}
    </>
  );
};

export default ProductList;

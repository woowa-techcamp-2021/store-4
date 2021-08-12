import React, { useState } from 'react';
import ProductItem from './ProductItem';

import { mockProductList } from './ProductMock';
import { ProductItemType } from '../../types/product';

import styled from 'styled-components';

enum Order {
  recent,
  priceLow,
  priceHigh,
}

function sortProductList(productList: Array<ProductItemType>, order: Order) {
  switch (order) {
    case Order.priceLow:
      return productList.sort((a: ProductItemType, b: ProductItemType) => a.price - b.price);
    case Order.priceHigh:
      return productList.sort((a: ProductItemType, b: ProductItemType) => b.price - a.price);
    case Order.recent:
      return productList.sort(
        (a: ProductItemType, b: ProductItemType) =>
          new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      );
  }
}

const ProductList = (): React.ReactElement => {
  const [listOrder, setListOrder] = useState(Order.recent);

  const onClickSortButton = (order: Order) => {
    setListOrder(order);
  };

  return (
    <>
      <SortButtonList>
        <SortButton
          onClick={() => {
            onClickSortButton(Order.recent);
          }}
        >
          최신순
        </SortButton>
        <SortButton
          onClick={() => {
            onClickSortButton(Order.priceLow);
          }}
        >
          낮은가격순
        </SortButton>
        <SortButton
          onClick={() => {
            onClickSortButton(Order.priceHigh);
          }}
        >
          높은가격순
        </SortButton>
      </SortButtonList>
      <ProductListWrapper>
        {sortProductList(mockProductList, listOrder).map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            uploadDate={product.uploadDate}
            imgSrc={product.imgSrc}
          ></ProductItem>
        ))}
      </ProductListWrapper>
    </>
  );
};

const ProductListWrapper = styled.ul`
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
`;

const SortButtonList = styled.div``;
const SortButton = styled.button``;

export default ProductList;

// # 의논할 것.
// 상품 테이블에 등록일 컬럼 추가해야함.
// box-sizeing: border-box 글로벌로 설정하는 편인지?
// 페이지 별로 따로 api 데이터 요청하게 할것인지??

// # 개선할 것.
// render 에서 sort 하는 거 -> 딴데서 잘.

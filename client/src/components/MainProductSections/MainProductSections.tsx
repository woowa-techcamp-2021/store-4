import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useProductList } from './hooks/useProductList';
import MainProductList from './MainProductList';
import { MockProductItemType } from './mock';

const MainProductSectionsContainer = styled.div``;

enum FILTER_OPTION {
  RECENT = 'recent',
  DISCOUNT = 'discount',
  MOST_SALES = 'mostSales',
}

const SECTION_TITLE = {
  [FILTER_OPTION.MOST_SALES]: '잘나가요',
  [FILTER_OPTION.RECENT]: '새로 나왔어요',
  [FILTER_OPTION.DISCOUNT]: '지금 할인 중',
};

const descendingDate = (a: MockProductItemType, b: MockProductItemType) => {
  return a.uploadDate.localeCompare(b.uploadDate);
};

const descendingDiscountRate = (a: MockProductItemType, b: MockProductItemType) => {
  return b.discountRate - a.discountRate;
};

const MainProductSections = (): React.ReactElement => {
  const { MOST_SALES, RECENT, DISCOUNT } = FILTER_OPTION;

  const productList = useProductList();
  const mostSalesProductList = [...productList].sort().slice(0, 4);
  const recentProductList = [...productList].sort(descendingDate).slice(0, 8);
  const discountProductList = [...productList].sort(descendingDiscountRate).slice(0, 8);

  const filteredDatas = {
    [MOST_SALES]: {
      title: SECTION_TITLE[MOST_SALES],
      products: mostSalesProductList,
    },
    [RECENT]: {
      title: SECTION_TITLE[RECENT],
      products: recentProductList,
    },
    [DISCOUNT]: {
      title: SECTION_TITLE[DISCOUNT],
      products: discountProductList,
    },
  };

  return (
    <MainProductSectionsContainer>
      <MainProductList {...filteredDatas[FILTER_OPTION.MOST_SALES]} />
      <MainProductList {...filteredDatas[FILTER_OPTION.RECENT]} />
      <MainProductList {...filteredDatas[FILTER_OPTION.DISCOUNT]} />
    </MainProductSectionsContainer>
  );
};

export default MainProductSections;

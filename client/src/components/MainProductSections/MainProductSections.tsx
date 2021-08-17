import React from 'react';
import styled from 'styled-components';
import { useProductAdList } from './hooks/useProductAdList';
import { useProductList } from './hooks/useProductList';
import MainAdList from './MainAdList/MainAdList';
import MainProductList from './MainProductList';
import { MockProductItemType } from './mock';

const MainProductSectionsContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

enum FilterOption {
  RECENT = 'recent',
  DISCOUNT = 'discount',
  MOST_SALES = 'mostSales',
}

const SECTION_TITLE = {
  [FilterOption.MOST_SALES]: '잘나가요',
  [FilterOption.RECENT]: '새로 나왔어요',
  [FilterOption.DISCOUNT]: '지금 할인 중',
};

const AD_TITLE = '선물하기 딱 좋아요!';

const descendingDate = (a: MockProductItemType, b: MockProductItemType) => {
  return a.uploadDate.localeCompare(b.uploadDate);
};

const descendingDiscountRate = (a: MockProductItemType, b: MockProductItemType) => {
  return b.discountRate - a.discountRate;
};

const MainProductSections = (): React.ReactElement => {
  const { MOST_SALES, RECENT, DISCOUNT } = FilterOption;

  const productList = useProductList();
  const productAdList = useProductAdList();

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
      <MainAdList title={AD_TITLE} products={productAdList} />
      <MainProductList {...filteredDatas[FILTER_OPTION.DISCOUNT]} />
    </MainProductSectionsContainer>
  );
};

export default MainProductSections;

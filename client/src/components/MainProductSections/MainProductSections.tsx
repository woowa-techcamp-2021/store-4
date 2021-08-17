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
  MostSales = 'mostSales',
  Recent = 'recent',
  Discount = 'discount',
}

const SECTION_TITLE = {
  [FilterOption.MostSales]: '잘나가요',
  [FilterOption.Recent]: '새로 나왔어요',
  [FilterOption.Discount]: '지금 할인 중',
};

const AD_TITLE = '선물하기 딱 좋아요!';

const descendingDate = (a: MockProductItemType, b: MockProductItemType) => {
  return a.uploadDate.localeCompare(b.uploadDate);
};

const descendingDiscountRate = (a: MockProductItemType, b: MockProductItemType) => {
  return b.discountRate - a.discountRate;
};

const MainProductSections = (): React.ReactElement => {
  const { MostSales, Recent, Discount } = FilterOption;

  const productList = useProductList();
  const productAdList = useProductAdList();

  const mostSalesProductList = [...productList].sort().slice(0, 4);
  const recentProductList = [...productList].sort(descendingDate).slice(0, 8);
  const discountProductList = [...productList].sort(descendingDiscountRate).slice(0, 8);

  const filteredDatas = {
    [MostSales]: {
      title: SECTION_TITLE[MostSales],
      products: mostSalesProductList,
    },
    [Recent]: {
      title: SECTION_TITLE[Recent],
      products: recentProductList,
    },
    [Discount]: {
      title: SECTION_TITLE[Discount],
      products: discountProductList,
    },
  };

  return (
    <MainProductSectionsContainer>
      <MainProductList {...filteredDatas[MostSales]} />
      <MainProductList {...filteredDatas[Recent]} />
      <MainAdList title={AD_TITLE} products={productAdList} />
      <MainProductList {...filteredDatas[Discount]} />
    </MainProductSectionsContainer>
  );
};

export default MainProductSections;

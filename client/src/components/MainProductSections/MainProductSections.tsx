import React from 'react';
import styled from 'styled-components';
import MainAdList from './MainAdList/MainAdList';
import MainProductList from './MainProductList';
import { MainProducts } from '../../types/product';
import { MockProductAdItemType } from './mock';

const Container = styled.div`
  width: 1200px;
  margin: 100px auto;
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

type Props = {
  mainProducts: MainProducts;
  mainAdProducts: MockProductAdItemType[];
};

const MainProductSections = (props: Props): JSX.Element => {
  const { MostSales, Recent, Discount } = FilterOption;
  const {
    mainProducts: { discountingProducts, newProducts, popularProducts },
    mainAdProducts,
  } = props;

  const filteredDatas = {
    [MostSales]: {
      title: SECTION_TITLE[MostSales],
      products: popularProducts,
    },
    [Recent]: {
      title: SECTION_TITLE[Recent],
      products: newProducts,
    },
    [Discount]: {
      title: SECTION_TITLE[Discount],
      products: discountingProducts,
    },
  };

  return (
    <Container>
      <MainProductList {...filteredDatas[MostSales]} />
      <MainProductList {...filteredDatas[Recent]} />
      <MainAdList title={AD_TITLE} products={mainAdProducts} />
      <MainProductList {...filteredDatas[Discount]} />
    </Container>
  );
};

export default MainProductSections;

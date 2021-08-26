import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import MainAdList from './MainAdList/MainAdList';
import MainProductList from './MainProductList';
import { MockProductAdItemType } from './mock';
import Product from '../../models/product';

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
  discountingProducts: Product[];
  popularProducts: Product[];
  newProducts: Product[];
  mainAdProducts: MockProductAdItemType[];
  getDiscountingWishClickHandler: (product: Product) => MouseEventHandler;
  getNewWishClickHandler: (product: Product) => MouseEventHandler;
  getPopularWishClickHandler: (product: Product) => MouseEventHandler;
};

const MainProductSections = (props: Props): JSX.Element => {
  const { MostSales, Recent, Discount } = FilterOption;
  const {
    mainAdProducts,
    discountingProducts,
    popularProducts,
    newProducts,
    getDiscountingWishClickHandler,
    getNewWishClickHandler,
    getPopularWishClickHandler,
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
      <MainProductList
        getWishClickHandler={getPopularWishClickHandler}
        {...filteredDatas[MostSales]}
      />
      <MainProductList getWishClickHandler={getNewWishClickHandler} {...filteredDatas[Recent]} />
      <MainAdList title={AD_TITLE} products={mainAdProducts} />
      <MainProductList
        getWishClickHandler={getDiscountingWishClickHandler}
        {...filteredDatas[Discount]}
      />
    </Container>
  );
};

export default MainProductSections;

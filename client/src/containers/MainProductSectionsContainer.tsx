import React from 'react';
import MainProductSections from '../components/MainProductSections/MainProductSections';
import { useMainProductList } from '../hooks/useMainProductList';
import { useMainAdProductList } from '../hooks/useMainAdProductList';
import useWish from '../hooks/useWish';

const MainProductSectionsContainer = (): JSX.Element => {
  const [
    [discountingProducts, setDiscountProducts],
    [popularProducts, setPopularProducts],
    [newProducts, setNewProducts],
  ] = useMainProductList();
  const mainAdProducts = useMainAdProductList();

  const [getDiscountingWishClickHandler] = useWish(discountingProducts, setDiscountProducts);
  const [getPopularWishClickHandler] = useWish(popularProducts, setPopularProducts);
  const [getNewWishClickHandler] = useWish(newProducts, setNewProducts);

  return (
    <MainProductSections
      getDiscountingWishClickHandler={getDiscountingWishClickHandler}
      getNewWishClickHandler={getNewWishClickHandler}
      getPopularWishClickHandler={getPopularWishClickHandler}
      discountingProducts={discountingProducts}
      popularProducts={popularProducts}
      newProducts={newProducts}
      mainAdProducts={mainAdProducts}
    />
  );
};

export default MainProductSectionsContainer;

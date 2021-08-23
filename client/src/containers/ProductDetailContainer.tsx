import React, { ChangeEvent, useCallback } from 'react';
import ProductInfoBox from '../components/ProductDetail/ProductInfoBox';
import useCartsInProduct from '../hooks/useCarstInProduct';
import useProduct from '../hooks/useDetailProduct';
import useSelectsWithSelected from '../hooks/useSelectsWithSelected';
import CartInProduct from '../models/cart-in-product';
import { SelectWithSelected } from '../types/product';

const ProductDetailContainer = (): JSX.Element => {
  const product = useProduct();
  const [selectsWithSelected, selectOption, resetOption] = useSelectsWithSelected(product);
  const [
    cartType,
    cartsInProduct,
    handleAppend,
    handleRemove,
    handleIncrease,
    handleDecrease,
    handleChangeCount,
    handleChangeInvalidCount,
  ] = useCartsInProduct(product);

  const handleGetSelectChangeHandler = useCallback(
    (selectWithSelected: SelectWithSelected) =>
      ({ target }: ChangeEvent<HTMLSelectElement>) => {
        const { value } = target;
        const changedOption = selectsWithSelected
          .find((select) => select.id === selectWithSelected.id)
          ?.productOptions.find((option) => option.id.toString() === value);

        if (changedOption === undefined) {
          return;
        }

        selectOption(changedOption);

        const isAllSelected = selectsWithSelected.every((select) => select.selectedOption !== null);

        if (isAllSelected) {
          handleAppend(selectsWithSelected);
          resetOption();
        }
      },
    [handleAppend, resetOption, selectOption, selectsWithSelected]
  );

  const handleGetCountChangeHandler = useCallback(
    (cartInProduct: CartInProduct) =>
      ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { value } = target;

        if (isNaN(+value)) {
          return;
        }

        handleChangeCount(cartInProduct, +value);
      },
    [handleChangeCount]
  );

  const handleGetCountBlurHandler = useCallback(
    (cartInProduct: CartInProduct) => () => {
      handleChangeInvalidCount(cartInProduct);
    },
    [handleChangeInvalidCount]
  );

  const handleGetIncreaseHandler = useCallback(
    (cartInProduct: CartInProduct) => () => handleIncrease(cartInProduct),
    [handleIncrease]
  );

  const handleGetDecreaseHandler = useCallback(
    (cartInProduct: CartInProduct) => () => handleDecrease(cartInProduct),
    [handleDecrease]
  );

  const handleGetRemoveHandler = useCallback(
    (cartInProduct: CartInProduct) => () => handleRemove(cartInProduct),
    [handleRemove]
  );

  return (
    <ProductInfoBox
      cartType={cartType}
      cartsInProduct={cartsInProduct}
      getCountChangeHandler={handleGetCountChangeHandler}
      getIncreaseCartHandler={handleGetIncreaseHandler}
      getDecreaseCartHandler={handleGetDecreaseHandler}
      getRemoveCartHandler={handleGetRemoveHandler}
      getCountBlurHandler={handleGetCountBlurHandler}
      product={product}
      selectsWithSelected={selectsWithSelected}
      getSelectChangeHandler={handleGetSelectChangeHandler}
    />
  );
};

export default ProductDetailContainer;
import { observer } from 'mobx-react';
import React, { ChangeEvent, useCallback, useEffect } from 'react';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import useCartsInProduct from '../hooks/useCartsInProduct';
import useProduct from '../hooks/useDetailProduct';
import useSelectsWithSelected from '../hooks/useSelectsWithSelected';
import { useHistory } from '../lib/router';
import CartInProduct from '../models/cart-in-product';
import { SelectWithSelected } from '../types/product';

const ProductDetailContainer = (): JSX.Element => {
  const [product, productFetchErrorStatus] = useProduct();
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

  const history = useHistory();

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

  useEffect(() => {
    if (productFetchErrorStatus === null) {
      return;
    }

    switch (productFetchErrorStatus) {
      case 404:
        history.push('/notfound');
        return;

      default:
        history.push('/error');
        return;
    }
  }, [history, productFetchErrorStatus]);

  return (
    <ProductDetail
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

export default observer(ProductDetailContainer);

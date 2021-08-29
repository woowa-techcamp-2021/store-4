import { observer } from 'mobx-react';
import React, { ChangeEvent, useCallback, useEffect } from 'react';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import useCartsInProduct from '../hooks/useCartsInProduct';
import useProduct from '../hooks/useDetailProduct';
import useSelectsWithSelected from '../hooks/useSelectsWithSelected';
import { useHistory } from '../lib/router';
import CartInProduct, { STOCK } from '../models/cart-in-product';
import cartStore from '../stores/cartStore';
import orderStore from '../stores/orderStore';
import productDetailStore from '../stores/productDetailStore';
import userStore from '../stores/userStore';
import { SelectWithSelected } from '../types/product';
import { isNone, isNotPositiveInteger } from '../utils/typeGuard';
import toast from '../lib/toast';

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

        if (isNotPositiveInteger(+value)) {
          return;
        }

        if (+value > STOCK) {
          toast.info(`현재 구매 가능한 최대 수량은 ${STOCK}개입니다`);
          return handleChangeCount(cartInProduct, STOCK);
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
    (cartInProduct: CartInProduct) => () => {
      if (cartInProduct.count + 1 > STOCK) {
        return toast.info(`현재 구매 가능한 최대 수량은 ${STOCK}개입니다`);
      }

      handleIncrease(cartInProduct);
    },
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

  const handleWishButtonHandler = useCallback(() => {
    if (isNone(userStore.user)) {
      toast.info('로그인이 필요합니다');
      return;
    }

    productDetailStore.toggleWish().catch((error) => {
      switch (error.status) {
        case 401:
        case 410:
          toast.error('세션이 만료되었습니다');
          history.push('/logout');
          return;

        case 404:
          toast.error('삭제된 상품입니다');
          history.push('/notfound');
          return;

        case 409:
          toast.info(
            productDetailStore.product?.isWished
              ? '이미 찜을 취소한 상품입니다'
              : '이미 찜한 상품입니다'
          );
          return;

        default:
          toast.error('오류가 발생했습니다');
          return;
      }
    });
  }, [history]);

  const handleClickOrderButton = () => {
    if (cartsInProduct.length === 0) {
      toast.info('상품의 옵션을 골라주세요');
      return;
    }

    orderStore.replaceListToCartsInProduct = cartsInProduct;
    history.push('/order');
  };

  const handleClickCartButton = () => {
    if (cartsInProduct.length === 0) {
      toast.info('상품의 옵션을 골라주세요');
      return;
    }

    toast.info('장바구니에 추가되었습니다');
    cartStore.addProductsToCart(cartsInProduct);
  };

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
      onOrderClick={handleClickOrderButton}
      product={product}
      selectsWithSelected={selectsWithSelected}
      getSelectChangeHandler={handleGetSelectChangeHandler}
      onWishClick={handleWishButtonHandler}
      onCartClick={handleClickCartButton}
    />
  );
};

export default observer(ProductDetailContainer);

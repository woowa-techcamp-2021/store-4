import { useCallback, useEffect, useState } from 'react';
import CartInProduct from '../models/cart-in-product';
import Product from '../models/product';
import { CartType, SelectWithSelected } from '../types/product';
import uuid from '../utils/uuid';

const isDuplicateSelects = (
  selectsWithSelectedA: SelectWithSelected[],
  selectsWithSelectedB: SelectWithSelected[]
) => {
  const selectedOptionsA = selectsWithSelectedA.map((selects) => selects.selectedOption);
  const selectedOptionsB = selectsWithSelectedB.map((selects) => selects.selectedOption);

  return selectedOptionsA.every((value, index) => value === selectedOptionsB[index]);
};

type UseCartsInProduct = [
  CartType,
  CartInProduct[],
  (option: SelectWithSelected[]) => void,
  (cartInProduct: CartInProduct) => void,
  (cartInProduct: CartInProduct) => void,
  (cartInProduct: CartInProduct) => void,
  (cartInProduct: CartInProduct, count: number) => void
];

const useCartsInProduct = (product: Product | null): UseCartsInProduct => {
  const [cartType, setCartType] = useState<CartType>('single');
  const [cartsInProduct, setCartsInProduct] = useState<CartInProduct[]>([]);

  const handleFindIndex = useCallback(
    (findCartInProduct: CartInProduct): number =>
      cartsInProduct.findIndex((cartInProduct) => cartInProduct.uuid === findCartInProduct.uuid),
    [cartsInProduct]
  );

  const handleReplace = useCallback(
    (replacedCartInProduct: CartInProduct) => {
      const index = handleFindIndex(replacedCartInProduct);

      setCartsInProduct((pre) => [
        ...pre.slice(0, index),
        replacedCartInProduct,
        ...pre.slice(index + 1, pre.length),
      ]);
    },
    [handleFindIndex]
  );

  const handleChangeCount = useCallback(
    (cartInProduct: CartInProduct, count: number) => {
      if (count < 0) {
        return;
      }

      cartInProduct.count = count;
      handleReplace(cartInProduct);
    },
    [handleReplace]
  );

  const handleIncrease = useCallback(
    (cartInProduct: CartInProduct) => {
      cartInProduct.count += 1;
      handleReplace(cartInProduct);
    },
    [handleReplace]
  );

  const handleRemove = useCallback(
    (cartInProduct: CartInProduct) => {
      if (cartType === 'single') {
        return;
      }

      const index = handleFindIndex(cartInProduct);

      setCartsInProduct([
        ...cartsInProduct.slice(0, index),
        ...cartsInProduct.slice(index + 1, cartsInProduct.length),
      ]);
    },
    [cartType, cartsInProduct, handleFindIndex]
  );

  const handleDecrease = useCallback(
    (cartInProduct: CartInProduct) => {
      if (cartInProduct.count <= 1) {
        handleRemove(cartInProduct);
        return;
      }

      cartInProduct.count -= 1;
      handleReplace(cartInProduct);
    },
    [handleRemove, handleReplace]
  );

  const handleAppend = useCallback(
    (selectsWithSelected: SelectWithSelected[]) => {
      if (product === null) {
        return;
      }

      const duplicateSelectedCartInProduct = cartsInProduct.find((cartInProduct) =>
        isDuplicateSelects(cartInProduct.options, selectsWithSelected)
      );

      if (duplicateSelectedCartInProduct !== undefined) {
        handleIncrease(duplicateSelectedCartInProduct);
        return;
      }

      const newCartInProduct: CartInProduct = new CartInProduct({
        uuid: uuid(),
        options: selectsWithSelected,
        count: 1,
        product,
      });

      setCartsInProduct((pre) => [...pre, newCartInProduct]);
    },
    [cartsInProduct, handleIncrease, product]
  );

  useEffect(() => {
    if (product === null) {
      return;
    }

    const cartType = product.productSelects.length === 0 ? 'single' : 'multi';

    setCartType(cartType);

    if (cartType === 'single') {
      setCartsInProduct([
        new CartInProduct({
          uuid: uuid(),
          options: [],
          count: 1,
          product,
        }),
      ]);
    }
  }, [product]);

  return [
    cartType,
    cartsInProduct,
    handleAppend,
    handleRemove,
    handleIncrease,
    handleDecrease,
    handleChangeCount,
  ];
};

export default useCartsInProduct;

import React from 'react';
import { render, screen } from '@testing-library/react';
import provideTheme2Test from '../../lib/provideTheme2Test';
import CartInProduct from '../../models/cart-in-product';
import uuid from '../../utils/uuid';
import Product from '../../models/product';
import ProductInfoBox from './ProductInfoBox';

describe('ProductCartItem 컴포넌트', () => {
  const PRODUCT = new Product({
    id: 1,
    name: '상품',
    price: 10000,
    discountRate: 10,
    content: '상품 정보',
    productImages: [],
    reviews: [],
    productSelects: [],
    isWished: false,
    createdAt: new Date(2021, 0, 1),
    updatedAt: new Date(2021, 0, 1),
  });

  const SINGLE_CART_IN_PRODUCT = new CartInProduct({
    uuid: uuid(),
    options: [],
    count: 1,
    product: PRODUCT,
  });

  const SELECTS_WITH_SELECTED = [
    {
      id: 1,
      name: '',
      productOptions: [],
      selectedOption: null,
    },
    {
      id: 2,
      name: '',
      productOptions: [],
      selectedOption: null,
    },
  ];

  const MULTI_CARTS_IN_PRODUCT = [
    new CartInProduct({
      uuid: uuid(),
      options: SELECTS_WITH_SELECTED,
      count: 1,
      product: PRODUCT,
    }),
  ];

  const DEFAULT_PROPS = {
    product: PRODUCT,
    getSelectChangeHandler: jest.fn().mockReturnValue(jest.fn()),
    getCountChangeHandler: jest.fn().mockReturnValue(jest.fn()),
    getCountBlurHandler: jest.fn().mockReturnValue(jest.fn()),
    getIncreaseCartHandler: jest.fn().mockReturnValue(jest.fn()),
    getDecreaseCartHandler: jest.fn().mockReturnValue(jest.fn()),
    getRemoveCartHandler: jest.fn().mockReturnValue(jest.fn()),
  };

  test('multi의 경우 옵션의 개수 만큼 Select 렌더링', () => {
    render(
      provideTheme2Test(
        <ProductInfoBox
          cartType="multi"
          cartsInProduct={MULTI_CARTS_IN_PRODUCT}
          selectsWithSelected={SELECTS_WITH_SELECTED}
          {...DEFAULT_PROPS}
        />
      )
    );

    const selects = screen.getAllByTestId('product-select');
    expect(selects.length).toBe(SELECTS_WITH_SELECTED.length);
  });

  test('single 타입일 경우 하나의 Select  렌더링', () => {
    render(
      provideTheme2Test(
        <ProductInfoBox
          cartType="single"
          cartsInProduct={[SINGLE_CART_IN_PRODUCT]}
          selectsWithSelected={[]}
          {...DEFAULT_PROPS}
        />
      )
    );

    expect(() => screen.getByTestId('product-select')).toThrowError();
  });

  test('multi의 경우 cartsInProduct의 개수 만큼 Cart 렌더링', () => {
    render(
      provideTheme2Test(
        <ProductInfoBox
          cartType="multi"
          cartsInProduct={MULTI_CARTS_IN_PRODUCT}
          selectsWithSelected={SELECTS_WITH_SELECTED}
          {...DEFAULT_PROPS}
        />
      )
    );

    const carts = screen.getAllByTestId('product-cart');
    expect(carts.length).toBe(MULTI_CARTS_IN_PRODUCT.length);
  });

  test('single의 경우 1개의 Cart 렌더링', () => {
    render(
      provideTheme2Test(
        <ProductInfoBox
          cartType="single"
          cartsInProduct={[SINGLE_CART_IN_PRODUCT]}
          selectsWithSelected={[]}
          {...DEFAULT_PROPS}
        />
      )
    );

    const carts = screen.getAllByTestId('product-cart');
    expect(carts.length).toBe(1);
  });
});

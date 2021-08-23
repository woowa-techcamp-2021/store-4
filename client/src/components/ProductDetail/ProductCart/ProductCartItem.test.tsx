import React from 'react';
import { render, screen } from '@testing-library/react';
import provideTheme2Test from '../../../lib/provideTheme2Test';
import ProductCartItem from './ProductCartItem';
import CartInProduct from '../../../models/cart-in-product';
import uuid from '../../../utils/uuid';
import Product from '../../../models/product';
import userEvent from '@testing-library/user-event';

describe('ProductCartItem 컴포넌트', () => {
  const onRemoveClick = jest.fn();

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

  const MULTI_CART_IN_PRODUCT = new CartInProduct({
    uuid: uuid(),
    options: [
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
    ],
    count: 1,
    product: PRODUCT,
  });

  const DEFAULT_PROPS = {
    onIncreaseClick: jest.fn(),
    onDecreaseClick: jest.fn(),
    onRemoveClick,
    onBlur: jest.fn(),
    onCountChange: jest.fn(),
  };

  test('single 타입일 경우 remove 버튼 UI 렌더링하지 않음', () => {
    render(
      provideTheme2Test(
        <ProductCartItem
          cartType="single"
          cartInProduct={SINGLE_CART_IN_PRODUCT}
          {...DEFAULT_PROPS}
        />
      )
    );

    expect(() => screen.getByTestId('product-cart-remove')).toThrowError();
  });

  test('multi 타입일 경우 해당 remove 버튼 UI 렌더링', () => {
    render(
      provideTheme2Test(
        <ProductCartItem
          cartType="multi"
          cartInProduct={MULTI_CART_IN_PRODUCT}
          {...DEFAULT_PROPS}
        />
      )
    );

    screen.getByTestId('product-cart-remove');
  });

  test('remove 버튼 클릭 시 onRemoveClick 호출', () => {
    render(
      provideTheme2Test(
        <ProductCartItem
          cartType="multi"
          cartInProduct={MULTI_CART_IN_PRODUCT}
          {...DEFAULT_PROPS}
        />
      )
    );

    const removeButton = screen.getByTestId('product-cart-remove');
    userEvent.click(removeButton);

    expect(onRemoveClick).toBeCalledTimes(1);
  });
});

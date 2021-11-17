import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import provideTheme2Test from '../../lib/provideTheme2Test';
import ProductItem from './ProductItem/ProductItem';
import Product from '../../models/product';
import ProductImage from '../../models/product-image';
import Review from '../../models/review';
import ProductSelect from '../../models/product-select';
import { toKoreanMoneyFormat } from '../../utils/moneyFormater';

const MONTH = 1000 * 60 * 60 * 24 * 31;

describe('ProductItem 테스트', () => {
  const PRODUCT_ATTRS = {
    id: 1,
    name: 'hi',
    price: 20000,
    content: 'hohohoho',
    productImages: [] as ProductImage[],
    reviews: [] as Review[],
    productSelects: [] as ProductSelect[],
    isWished: false,
    isOrdered: false,
    updatedAt: new Date(),
  };

  const onWishClick = jest.fn();

  test('discountRate가 0보다 크고, createAt이 한달 이내이면 new, sale 뱃지 표시', () => {
    const product: Product = new Product({
      ...PRODUCT_ATTRS,
      discountRate: 15,
      createdAt: new Date(),
    });
    render(provideTheme2Test(<ProductItem onWishClick={onWishClick} product={product} />));
    screen.getByText('NEW');
    screen.getByText('SALE');
  });

  test('discountRate가 0이고, createAt이 한달 이상이면 아무 표시 없음', () => {
    const product: Product = new Product({
      ...PRODUCT_ATTRS,
      discountRate: 0,
      createdAt: new Date(Date.now() - MONTH),
    });
    render(provideTheme2Test(<ProductItem onWishClick={onWishClick} product={product} />));
    expect(() => screen.getByText('NEW')).toThrowError();
    expect(() => screen.getByText('SALE')).toThrowError();
  });

  test('discountRate가 0이고, createAt이 한달 이내이면 new 뱃지만 표시', () => {
    const product: Product = new Product({
      ...PRODUCT_ATTRS,
      discountRate: 0,
      createdAt: new Date(),
    });
    render(provideTheme2Test(<ProductItem onWishClick={onWishClick} product={product} />));
    screen.getByText('NEW');
    expect(() => screen.getByText('SALE')).toThrowError();
  });

  test('discountRate가 0보다 크고, createAt이 한달 이상이면 sale 뱃지만 표시', () => {
    const product: Product = new Product({
      ...PRODUCT_ATTRS,
      discountRate: 10,
      createdAt: new Date(Date.now() - MONTH),
    });
    render(provideTheme2Test(<ProductItem onWishClick={onWishClick} product={product} />));
    expect(() => screen.getByText('NEW')).toThrowError();
    screen.getByText('SALE');
  });

  test('discountRate가 존재하면, 정상가, 할인가가 모두 존재', () => {
    const product: Product = new Product({
      ...PRODUCT_ATTRS,
      discountRate: 15,
      createdAt: new Date(),
    });
    render(provideTheme2Test(<ProductItem onWishClick={onWishClick} product={product} />));

    expect(screen.getByTestId('price').textContent).toBe(toKoreanMoneyFormat(product.price));
    expect(screen.getByTestId('discountedPrice').textContent).toBe(
      toKoreanMoneyFormat(product.discountedPrice)
    );
  });

  test('discountRate가 없으면 정상가만 존재', () => {
    const product: Product = new Product({
      ...PRODUCT_ATTRS,
      discountRate: 0,
      createdAt: new Date(),
    });
    render(provideTheme2Test(<ProductItem onWishClick={onWishClick} product={product} />));
    expect(screen.getByTestId('price').textContent).toBe(toKoreanMoneyFormat(product.price));
    expect(() => screen.getByTestId('discountPrice')).toThrowError();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import provideTheme2Test from '../../lib/provideTheme2Test';
import ProductSelectBox from './ProductSelectBox';

const PRODUCT_SELECT = {
  id: 1,
  name: '옵션',
  productOptions: [
    { id: 1, name: '화이트', additionalPrice: 0 },
    { id: 2, name: '블랙', additionalPrice: 0 },
  ],
};
const SELECTED = { id: 2, name: '블랙', additionalPrice: 0 };

describe('ProductSelectBox 컴포넌트', () => {
  const onChange = jest.fn();
  beforeEach(() => {
    render(
      provideTheme2Test(
        <ProductSelectBox productSelect={PRODUCT_SELECT} selected={SELECTED} onChange={onChange} />
      )
    );
  });

  test('ProductSelectBox의 옵션은 해당 옵션의 개수', () => {
    const productOptions = screen.getAllByTestId('product-select-product-option');

    expect(productOptions.length).toBe(PRODUCT_SELECT.productOptions.length);
  });

  test('ProductSelectBox의 옵션은 해당 옵션의 개수', () => {
    const productOptions = screen.getAllByTestId('product-select-product-option');

    expect(productOptions.length).toBe(PRODUCT_SELECT.productOptions.length);
  });
});

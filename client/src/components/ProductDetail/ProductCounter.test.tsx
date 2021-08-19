import React from 'react';
import { render, screen } from '@testing-library/react';
import provideTheme2Test from '../../lib/provideTheme2Test';
import userEvent from '@testing-library/user-event';
import ProductCounter from './ProductCounter';

describe('ProductCounter 컴포넌트', () => {
  const COUNT = 0;
  const increase = jest.fn();
  const decrease = jest.fn();

  beforeEach(() => {
    render(
      provideTheme2Test(<ProductCounter count={COUNT} increase={increase} decrease={decrease} />)
    );
  });

  test('ProductCounter에서 increase 버튼 클릭 시 호출', () => {
    const increaseButton = screen.getByTestId('product-counter-increase');

    userEvent.click(increaseButton);
    expect(increase).toBeCalledTimes(1);
  });

  test('ProductCounter에서 decrease 버튼 클릭 시 호출', () => {
    const decreaseButton = screen.getByTestId('product-counter-decrease');

    userEvent.click(decreaseButton);
    expect(decrease).toBeCalledTimes(1);
  });
});

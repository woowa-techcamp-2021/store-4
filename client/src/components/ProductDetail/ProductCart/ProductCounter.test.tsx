import React from 'react';
import { render, screen } from '@testing-library/react';
import provideTheme2Test from '../../../lib/provideTheme2Test';
import userEvent from '@testing-library/user-event';
import ProductCounter from './ProductCounter';

describe('ProductCounter 컴포넌트', () => {
  const COUNT = 0;
  const onIncreaseClick = jest.fn();
  const onDecreaseClick = jest.fn();
  const onCountChange = jest.fn();
  const onBlur = jest.fn();

  beforeEach(() => {
    render(
      provideTheme2Test(
        <ProductCounter
          onCountChange={onCountChange}
          count={COUNT}
          onIncreaseClick={onIncreaseClick}
          onDecreaseClick={onDecreaseClick}
          onBlur={onBlur}
        />
      )
    );
  });

  test('ProductCounter에서 increase 버튼 클릭 시 호출', () => {
    const increaseButton = screen.getByTestId('product-counter-increase');

    userEvent.click(increaseButton);
    expect(onIncreaseClick).toBeCalledTimes(1);
  });

  test('ProductCounter에서 decrease 버튼 클릭 시 호출', () => {
    const decreaseButton = screen.getByTestId('product-counter-decrease');

    userEvent.click(decreaseButton);
    expect(onDecreaseClick).toBeCalledTimes(1);
  });

  test('ProductCounter에서 count 값 변경 시 onCountChange 핸들리 호출', () => {
    const TEXT = '123';
    const counterInput = screen.getByTestId('product-counter-count');

    userEvent.click(counterInput);
    userEvent.keyboard(TEXT);
    expect(onCountChange).toBeCalledTimes(TEXT.length);
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import provideTheme2Test from '../../lib/provideTheme2Test';
import userEvent from '@testing-library/user-event';
import ProductCounterController from './ProductCountController';

describe('ProductCounterController 컴포넌트', () => {
  const DEFAULT_PROPS = {
    price: 1000,
    title: '제목',
    increase: jest.fn(),
    decrease: jest.fn(),
    hasOption: false,
    count: 0,
    remove: jest.fn(),
    onCountChange: jest.fn(),
  };

  test('price, title UI 표시', () => {
    render(provideTheme2Test(<ProductCounterController {...DEFAULT_PROPS} />));

    screen.getByText(DEFAULT_PROPS.title);
    screen.getByText(DEFAULT_PROPS.price);
  });

  test('옵션이 없다면 remove 버튼 렌더링하지 않음', () => {
    render(provideTheme2Test(<ProductCounterController {...DEFAULT_PROPS} hasOption={false} />));

    expect(() => screen.getByTestId('product-count-controller-remove')).toThrowError();
  });

  test('옵션이 있다면 remove 버튼 렌더링', () => {
    render(provideTheme2Test(<ProductCounterController {...DEFAULT_PROPS} hasOption={true} />));

    screen.getByTestId('product-count-controller-remove');
  });

  test('remove 버튼 클릭 시 remove 함수 호출', () => {
    const remove = jest.fn();
    render(
      provideTheme2Test(
        <ProductCounterController {...DEFAULT_PROPS} remove={remove} hasOption={true} />
      )
    );

    const removeButton = screen.getByTestId('product-count-controller-remove');
    userEvent.click(removeButton);

    expect(remove).toBeCalledTimes(1);
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import provideTheme2Test from '../../lib/provideTheme2Test';
import { ProductListOrder } from '../../types/product';
import optionStore from '../../stores/optionStore';
import SortButtonList from './SortButtonList';

describe('SortButtonList 테스트', () => {
  const SORT_BUTTONS = [
    { key: ProductListOrder.Recommend, body: '추천순' },
    { key: ProductListOrder.Popularity, body: '인기순' },
    { key: ProductListOrder.Recent, body: '최신순' },
    { key: ProductListOrder.PriceLow, body: '낮은가격순' },
    { key: ProductListOrder.PriceHigh, body: '높은가격순' },
  ];

  const handleSortButton = (sortOption: ProductListOrder) => () => {
    optionStore.changeSortOption(sortOption);
  };

  beforeEach(() => {
    render(
      provideTheme2Test(
        <SortButtonList buttons={SORT_BUTTONS} onClickSortButton={handleSortButton} />
      )
    );
  });

  test('버튼 클릭 시 sort option 변경', () => {
    for (const prop of SORT_BUTTONS) {
      const btn = screen.getByText(prop.body);
      userEvent.click(btn);
      expect(optionStore.option.sort).toBe(prop.key);
    }
  });
});

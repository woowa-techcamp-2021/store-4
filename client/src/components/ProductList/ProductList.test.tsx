import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import provideTheme2Test from '../../lib/provideTheme2Test';
import Product from '../../models/product';
import { ProductListOrder } from '../../types/product';
import ProductList from './ProductList';
import { range } from '../../utils/range';

describe('ProductList 테스트', () => {
  const optionStore = {
    option: { pageNum: 0 },
    changePageNum(pageNum: number) {
      this.option.pageNum = pageNum;
    },
  };

  const SORT_BUTTONS = [
    { key: ProductListOrder.Recommend, body: '추천순' },
    { key: ProductListOrder.Popularity, body: '인기순' },
    { key: ProductListOrder.Recent, body: '최신순' },
    { key: ProductListOrder.PriceLow, body: '낮은가격순' },
    { key: ProductListOrder.PriceHigh, body: '높은가격순' },
  ];
  const mock = {
    getWishClickHandler: jest.fn().mockResolvedValue(jest.fn()),
    products: [] as Product[],
    buttons: SORT_BUTTONS,
    currentPage: 1,
    onClickSortButton: () => () => {
      return;
    },
    onClickPageNum: (pageNum: number) => {
      optionStore.changePageNum(pageNum);
    },
  };

  test('searchTerm이 있는 경우 해당 search 검색결과와 totalProductCount 표시', () => {
    const rest = {
      totalProductCount: 76,
      totalPageCount: 4,
      searchTerm: '사자',
    };
    render(provideTheme2Test(<ProductList {...mock} {...rest} />));
    const listHeaderLeft = screen.getByTestId('listHeaderLeft');
    expect(listHeaderLeft.textContent).toBe(
      `"${rest.searchTerm}" 검색결과 ${rest.totalProductCount}개`
    );
  });

  test('searchTerm이 없는 경우, totalProductCount만 표시', () => {
    const rest = {
      totalProductCount: 76,
      totalPageCount: 4,
      searchTerm: null,
    };
    render(provideTheme2Test(<ProductList {...mock} {...rest} />));
    expect(() => screen.getByTestId('listHeaderLeft')).toThrowError();
    expect(screen.getByTestId('totalCount').textContent).toBe(`총 ${rest.totalProductCount}개`);
  });

  test('pageNavItem 클릭 시 optionStore pageNum 변경', () => {
    const rest = {
      totalProductCount: 76,
      totalPageCount: 4,
      searchTerm: null,
    };
    render(provideTheme2Test(<ProductList {...mock} {...rest} />));
    range(rest.totalPageCount).forEach((index) => {
      const pageNum = index + 1;
      const navItem = screen.getByTestId(`number-button-${pageNum}`);
      userEvent.click(navItem);
      expect(optionStore.option.pageNum).toBe(pageNum);
    });
  });
});

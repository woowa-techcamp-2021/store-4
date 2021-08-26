import React from 'react';
import { render, screen } from '@testing-library/react';
import provideTheme2Test from '../../../lib/provideTheme2Test';
import WishItem from './WishItem';
import TEST_IMG from '../../../assets/images/towel.png';

const setCheckBox = jest.fn();

const DEFAULT_PROPS = {
  wishItem: {
    id: 0,
    title: '은수저',
    imgSrc: TEST_IMG,
    defaultPrice: 10000,
    count: 2,
    checked: false,
    options: [],
  },
  setCheckBox,
};

describe('WishItem 컴포넌트', () => {
  test('WishItem UI 테스트', () => {
    render(
      provideTheme2Test(
        <WishItem wishItem={DEFAULT_PROPS.wishItem} setCheckBox={DEFAULT_PROPS.setCheckBox} />
      )
    );

    screen.getByText('은수저');
    screen.getByText('20,000원');
    screen.getByText('/ 2개');
  });
});

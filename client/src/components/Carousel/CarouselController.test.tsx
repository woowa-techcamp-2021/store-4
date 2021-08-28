import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import provideTheme2Test from '../../lib/provideTheme2Test';
import CarouselController from './CarouselController';
import Beer from './mock/beer.gif';
import Bottle from './mock/bottle.gif';
import Pencil from './mock/pencil.gif';

describe('캐러셀 테스트', () => {
  const mockImages = [
    { index: 0, src: Pencil },
    { index: 1, src: Bottle },
    { index: 2, src: Beer },
  ];
  let currentIndex = 0;

  beforeEach(() => {
    currentIndex = 0;
    const onDotClick = jest.fn(
      (index: number): React.MouseEventHandler =>
        () => {
          currentIndex = index;
        }
    );
    render(
      provideTheme2Test(
        <CarouselController
          images={mockImages}
          currentIndex={currentIndex}
          onDotClick={onDotClick}
        />
      )
    );
  });

  test('images에 따른 Dot 렌더링', () => {
    expect(screen.getAllByTestId('carousel-dot').length).toBe(mockImages.length);
  });

  test('dot 클릭 시 currentIndex 변화', () => {
    mockImages.forEach((img, index) => {
      const dot = screen.getAllByTestId('carousel-dot')[index];
      userEvent.click(dot);
      expect(currentIndex).toBe(img.index);
    });
  });
});

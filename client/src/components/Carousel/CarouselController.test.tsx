import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import provideTheme2Test from '../../lib/provideTheme2Test';
import CarouselController from './CarouselController';

describe('캐러셀 테스트', () => {
  const mockImages = [
    {
      index: 0,
      src: {
        webm: '',
        mp4: '',
      },
      productId: 0,
    },
    {
      index: 1,
      src: {
        webm: '',
        mp4: '',
      },
      productId: 1,
    },
    {
      index: 2,
      src: {
        webm: '',
        mp4: '',
      },
      productId: 2,
    },
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

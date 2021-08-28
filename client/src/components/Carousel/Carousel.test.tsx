import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import provideTheme2Test from '../../lib/provideTheme2Test';
import Carousel from './Carousel';
import Beer from './mock/beer.gif';
import Bottle from './mock/bottle.gif';
import Pencil from './mock/pencil.gif';
import { act } from 'react-dom/test-utils';

describe('캐러셀 테스트', () => {
  const mockImages = [
    { index: 0, src: Pencil },
    { index: 1, src: Bottle },
    { index: 2, src: Beer },
  ];

  const INTERVAL_TIME = 2000;

  beforeEach(() => {
    jest.useFakeTimers();
    render(provideTheme2Test(<Carousel images={mockImages} interval={INTERVAL_TIME} />));
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('캐러셀 하단 컨트롤러 버튼 클릭 시 이미지 변경', async () => {
    const videos = screen.getAllByTestId('carousel-item');
    const dots = screen.getAllByTestId('carousel-dot');

    for (let i = 0; i < mockImages.length; i++) {
      const dot = dots[i];

      userEvent.click(dot);

      for (let j = 0; j < mockImages.length; j++) {
        if (i === j) {
          expect(videos[j]).toBeVisible();
          continue;
        }
        expect(videos[j]).not.toBeVisible();
      }
    }
  });
});

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
    { index: 0, src: Pencil, productId: 0 },
    { index: 1, src: Bottle, productId: 1 },
    { index: 2, src: Beer, productId: 2 },
  ];

  const INTERVAL_TIME = 2000;

  beforeEach(() => {
    jest.useFakeTimers();
    render(provideTheme2Test(<Carousel images={mockImages} interval={INTERVAL_TIME} />));
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('캐러셀 무한 슬라이딩', () => {
    let current = 0;

    act(() => {
      const imgs = mockImages.map((img) => screen.getByTestId(`img${img.index}`));
      for (let i = 0; i < 20; i++) {
        jest.advanceTimersByTime(INTERVAL_TIME + 40);

        if (current === mockImages.length - 1) {
          expect(imgs[0]).toBeVisible();
          expect(imgs[current - 1]).not.toBeVisible();
          current = 0;
        } else {
          expect(imgs[current]).not.toBeVisible();
          current += 1;
          expect(imgs[current]).toBeVisible();
        }
      }
    });
  });

  test('캐러셀 하단 컨트롤러 버튼 클릭 시 이미지 변경', async () => {
    const imgs = mockImages.map((img) => screen.getByTestId(`img${img.index}`));
    const dots = mockImages.map((img) => screen.getByTestId(`dot${img.index}`));
    for (let i = 0; i < mockImages.length; i++) {
      const dot = dots[i];
      userEvent.click(dot);
      for (let j = 0; j < mockImages.length; j++) {
        if (i === j) {
          expect(imgs[j]).toBeVisible();
          continue;
        }
        expect(imgs[j]).not.toBeVisible();
      }
    }
  });
});

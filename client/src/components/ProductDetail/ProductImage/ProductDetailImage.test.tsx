import React from 'react';
import { render, screen } from '@testing-library/react';
import provideTheme2Test from '../../../lib/provideTheme2Test';
import userEvent from '@testing-library/user-event';
import ProductDetailImages from './ProductDetailImages';

describe('ProductDetailImage 컴포넌트', () => {
  const IMAGES = ['imageA', 'imageB', 'imageC'];

  beforeEach(() => {
    render(provideTheme2Test(<ProductDetailImages images={IMAGES} />));
  });

  test(`표시되는 셀렉터의 개수는 ${IMAGES.length}개`, () => {
    const imageSelectors = screen.getAllByTestId('image-selector');

    expect(imageSelectors.length).toBe(IMAGES.length);
  });

  test(`호버된 이미지가 MagnifierImage에 전달되어 표시`, () => {
    const SELECTED_IMAGE_INDEX = 0;
    const imageSelector = screen.getAllByTestId('image-selector')[SELECTED_IMAGE_INDEX];

    userEvent.hover(imageSelector);

    const selectedImage = screen.getByTestId('selected-image');
    const selectedImageSource = selectedImage.getAttribute('src');

    expect(selectedImageSource).toBe(IMAGES[SELECTED_IMAGE_INDEX]);
  });
});

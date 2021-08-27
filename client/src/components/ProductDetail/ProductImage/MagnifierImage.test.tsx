import React from 'react';
import { render, screen } from '@testing-library/react';
import provideTheme2Test from '../../../lib/provideTheme2Test';
import MagnifierImage from './MagnifierImage';
import userEvent from '@testing-library/user-event';

describe('MagnifierImage 컴포넌트', () => {
  beforeEach(() => {
    render(provideTheme2Test(<MagnifierImage image="" />));
  });

  test(`ImageViewer에 마우시 호버 시 Magnifier와 MagnifiedViewer 표시`, () => {
    const imageViewer = screen.getByTestId('image-viewer');
    userEvent.hover(imageViewer);

    screen.getByTestId('magnifier');
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from './App';

describe('App Test', () => {
  test('test-01', () => {
    const result = render(<App />);

    expect(result.getByText('App')).toHaveTextContent('App');
  });
});

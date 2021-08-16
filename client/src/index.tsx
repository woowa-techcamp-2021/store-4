import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header';

import ProductListWrapper from './components/ProductList/ProductList';

ReactDOM.render(
  <div>
    <ProductListWrapper></ProductListWrapper>
  </div>,
  document.querySelector('#root')
);

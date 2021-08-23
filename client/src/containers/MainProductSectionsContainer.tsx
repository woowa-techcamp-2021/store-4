import React from 'react';
import MainProductSections from '../components/MainProductSections/MainProductSections';
import { useMainProductList } from '../hooks/useMainProductList';

const MainProductSectionsContainer = (): JSX.Element => {
  const [mainProducts] = useMainProductList();
  return <MainProductSections mainProducts={mainProducts} />;
};

export default MainProductSectionsContainer;

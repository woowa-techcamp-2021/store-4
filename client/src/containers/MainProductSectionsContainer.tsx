import React from 'react';
import MainProductSections from '../components/MainProductSections/MainProductSections';
import { useMainProductList } from '../hooks/useMainProductList';
import { useMainAdProductList } from '../hooks/useMainAdProductList';

const MainProductSectionsContainer = (): JSX.Element => {
  const mainProducts = useMainProductList();
  const mainAdProducts = useMainAdProductList();
  return <MainProductSections mainProducts={mainProducts} mainAdProducts={mainAdProducts} />;
};

export default MainProductSectionsContainer;

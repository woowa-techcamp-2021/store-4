import { useCallback, useEffect, useState } from 'react';
import Product from '../models/product';
import ProductOption from '../models/product-option';
import { SelectWithSelected } from '../types/product';

type UseSelectsWithSelected = [SelectWithSelected[], (option: ProductOption) => void, () => void];

const useSelectsWithSelected = (product: Product | null): UseSelectsWithSelected => {
  const [selectsWithSelected, setSelectsWithSelected] = useState<SelectWithSelected[]>([]);

  const selectOption = useCallback(
    (selectedOption: ProductOption) => {
      const selectedSelect = selectsWithSelected.find(
        (select) =>
          select.productOptions.find((option) => option.id === selectedOption.id) !== undefined
      );

      if (selectedSelect === undefined) {
        return;
      }

      selectedSelect.selectedOption = selectedOption;
      setSelectsWithSelected([...selectsWithSelected]);
    },
    [selectsWithSelected]
  );

  const resetOption = useCallback(() => {
    if (product === null) {
      return;
    }

    const productSelects = product.productSelects.map((select) => ({
      ...select,
      selectedOption: null,
    }));

    setSelectsWithSelected(productSelects);
  }, [product]);

  useEffect(() => {
    resetOption();
  }, [resetOption]);

  return [selectsWithSelected, selectOption, resetOption];
};

export default useSelectsWithSelected;

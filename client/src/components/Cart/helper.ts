import { SelectWithSelected } from '../../types/product';
import { isNone } from '../../utils/typeGuard';

export const getSelectedOptionName = (selectWithSelected: SelectWithSelected): string => {
  if (isNone(selectWithSelected)) {
    return '';
  }

  if (isNone(selectWithSelected.selectedOption)) {
    return '';
  }

  return selectWithSelected.selectedOption.name;
};

export const getSelectedOptionPrice = (selectWithSelected: SelectWithSelected): number => {
  if (isNone(selectWithSelected)) {
    return 0;
  }

  if (isNone(selectWithSelected.selectedOption)) {
    return 0;
  }

  return selectWithSelected.selectedOption.additionalPrice;
};

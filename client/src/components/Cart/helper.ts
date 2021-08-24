import { SelectWithSelected } from '../../types/product';
import { isNone } from '../../utils/typeGuard';

export const getOptionList = (selectWithSelecteds: SelectWithSelected[]) => {
  const optionPriceList = selectWithSelecteds
    ? getSelectedOptionPriceList(selectWithSelecteds)
    : [];
  const optionTypeList = selectWithSelecteds ? getSelectedOptionTypeList(selectWithSelecteds) : [];
  const optionNameList = selectWithSelecteds ? getSelectedOptionNameList(selectWithSelecteds) : [];

  const optionList = [];

  for (let i = 0; i < selectWithSelecteds.length; i++) {
    optionList.push({
      type: optionTypeList[i],
      name: optionNameList[i],
      price: optionPriceList[i],
    });
  }

  return optionList;
};

export const getSelectedOptionTypeList = (selectWithSelecteds: SelectWithSelected[]): string[] => {
  if (isNone(selectWithSelecteds)) {
    return [];
  }

  return selectWithSelecteds.map((selected: SelectWithSelected) => selected.name);
};

export const getSelectedOptionNameList = (selectWithSelecteds: SelectWithSelected[]): string[] => {
  if (isNone(selectWithSelecteds)) {
    return [];
  }

  return selectWithSelecteds.map((selected: SelectWithSelected) => getSelectedOptionName(selected));
};

export const getSelectedOptionName = (selectWithSelected: SelectWithSelected): string => {
  if (isNone(selectWithSelected)) {
    return '';
  }

  if (isNone(selectWithSelected.selectedOption)) {
    return '';
  }

  return selectWithSelected.selectedOption.name;
};

export const getSelectedOptionPriceList = (selectWithSelecteds: SelectWithSelected[]): number[] => {
  if (isNone(selectWithSelecteds) || !Array.isArray(selectWithSelecteds)) {
    return [];
  }

  return selectWithSelecteds.map((selected: SelectWithSelected) =>
    getSelectedOptionPrice(selected)
  );
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

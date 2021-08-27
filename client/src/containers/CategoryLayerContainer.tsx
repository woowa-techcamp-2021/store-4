import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import CategoryLayer, { Props } from '../components/Header/HeaderMain/CategoryMenu/CategoryLayer';
import categoryStore from '../stores/categoryStore';
import optionStore from '../stores/optionStore';
import Category from '../models/category';
import useOption from '../hooks/useOption';

const Empty = styled.div``;

export type CategoryClickHandler = (category: Category) => void;

export const CATEGORY_ALL = new Category({
  id: 0,
  name: '모든 상품',
  parentCategory: null,
  childCategories: [],
  isRoot: true,
});

const CategoryContainer = (): JSX.Element => {
  const { changeCategory } = useOption();
  const categories = categoryStore.categories;
  const option = optionStore.option;

  const handleCategoryClick: CategoryClickHandler = (category: Category) => {
    changeCategory(category.id);
  };

  if (categories.length === 0) {
    return <Empty />;
  }

  const rootCategories = [CATEGORY_ALL, ...categories.filter((category) => category.isRoot)];

  if (rootCategories.length === 1) {
    return <Empty />;
  }

  const props: Props = { rootCategories, onCategoryClick: handleCategoryClick, option };
  return <CategoryLayer {...props} />;
};

export default observer(CategoryContainer);

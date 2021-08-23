import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import CategoryLayer, { Props } from '../components/Header/HeaderMain/CategoryMenu/CategoryLayer';
import categoryStore from '../stores/categoryStore';
import optionStore from '../stores/optionStore';
import Category from '../models/category';

const Empty = styled.div``;

export type CategoryClickHandler = (category: Category) => void;

const handleCategoryClick: CategoryClickHandler = (category: Category) =>
  optionStore.setCategory(category.id);

const CategoryContainer = (): JSX.Element => {
  const categories = categoryStore.categories;
  const option = optionStore.option;

  if (categories.length === 0) {
    return <Empty />;
  }

  const rootCategories = categories.filter((category) => category.isRoot);

  if (rootCategories.length === 0) {
    return <Empty />;
  }

  const props: Props = { rootCategories, onCategoryClick: handleCategoryClick, option };
  return <CategoryLayer {...props} />;
};

export default observer(CategoryContainer);

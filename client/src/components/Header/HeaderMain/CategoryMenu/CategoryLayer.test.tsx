import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import provideTheme2Test from '../../../../lib/provideTheme2Test';
import CategoryLayer, { Props } from './CategoryLayer';
import Category from '../../../../models/category';
import userEvent from '@testing-library/user-event';

describe('CategoryLayer 컴포넌트', () => {
  const PARENT_CATEGORY_NAME = '문구';
  const PARENT_CATEGORY_NAME_2 = '리빙';
  const CHILD_CATEGORY_NAME = '연필';

  const onCategoryClick = jest.fn((category: Category) => {
    return category.name;
  });

  const parentWithChild = new Category({
    id: 1,
    name: PARENT_CATEGORY_NAME,
    parentCategory: null,
    childCategories: [],
    isRoot: true,
  });

  const childCategory = new Category({
    id: 3,
    name: CHILD_CATEGORY_NAME,
    parentCategory: parentWithChild,
    childCategories: [],
    isRoot: false,
  });

  parentWithChild.childCategories = [childCategory];

  const parentWithoutChild = new Category({
    id: 2,
    name: PARENT_CATEGORY_NAME_2,
    parentCategory: null,
    childCategories: [],
    isRoot: true,
  });

  const props: Props = {
    categories: [parentWithChild, parentWithoutChild, childCategory],
    onCategoryClick,
  };

  beforeEach(() => {
    render(provideTheme2Test(<CategoryLayer {...props} />));
  });

  test('랜더링', async () => {
    expect(screen.getByText(PARENT_CATEGORY_NAME)).toBeInTheDocument();
    expect(screen.getByText(CHILD_CATEGORY_NAME)).toBeInTheDocument();
  });

  test('부모 카테고리 호버', async () => {
    const $parentWithoutChild = screen.getByText(PARENT_CATEGORY_NAME_2);
    userEvent.hover($parentWithoutChild);
    expect(screen.getByTestId('child-list')).toBeEmptyDOMElement();

    const $parentWithChild = screen.getByText(PARENT_CATEGORY_NAME);
    userEvent.hover($parentWithChild);
    expect(screen.getByTestId('child-list')).not.toBeEmptyDOMElement();
  });

  test('자식 카테고리 클릭', async () => {
    const $childCategory = screen.getByText(CHILD_CATEGORY_NAME);
    userEvent.click($childCategory);

    expect(onCategoryClick).toBeCalledWith(childCategory);
    expect(onCategoryClick.mock.results[0].value).toBe(childCategory.name);
  });
});

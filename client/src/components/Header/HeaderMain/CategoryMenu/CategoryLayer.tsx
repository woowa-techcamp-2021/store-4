import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { rootListStyle, childListStyle, textUnderline } from './categoryLayerCss';
import { CategoryClickHandler, CATEGORY_ALL } from '../../../../containers/CategoryLayerContainer';
import Category from '../../../../models/category';
import { debounce, clearDebounce } from '../../../../lib/debounce';

const Container = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  width: 290px;
  min-height: 300px;
  display: flex;
  flex-direction: row;
  border: 1px solid ${(props) => props.theme.color.grey2};
  cursor: pointer;
  z-index: 999;
`;

type CategoryListProps = {
  isRoot: boolean;
};

const CategoryList = styled.ul<CategoryListProps>`
  flex: 1;
  margin: 0;
  padding: 0;

  ${(props) => (props.isRoot ? rootListStyle : childListStyle)};
`;

type CategoryListItemProps = {
  isCurrent?: boolean;
};

const CategoryListItem = styled.li<CategoryListItemProps>`
  background-color: ${(props) => (props.isCurrent ? '#fdfdfd' : 'inherit')} !important;
  color: ${(props) => (props.isCurrent ? props.theme.color.grey5 : 'inherit')} !important;
`;

const CategoryListItemText = styled.span<CategoryListItemProps>`
  position: relative;
  ${(props) => (props.isCurrent ? textUnderline(props.theme.color.mint2) : '')};
`;

export type Props = {
  rootCategories: Category[];
  onCategoryClick: CategoryClickHandler;
};

const CategoryLayer = (props: Props): JSX.Element => {
  const { rootCategories, onCategoryClick } = props;
  const [currentCategory, setCurrentCategory] = useState<null | Category>();

  const handleGetCategoryClickHandler = useCallback(
    (category: Category) => () => {
      onCategoryClick(category);
    },
    [onCategoryClick]
  );

  useEffect(() => {
    if (rootCategories.length > 0) {
      setCurrentCategory(rootCategories[0]);
    }
  }, [rootCategories]);

  const rootItems = rootCategories.map((category) => (
    <CategoryListItem
      key={category.id}
      isCurrent={category.id === currentCategory?.id}
      onMouseEnter={() => debounce(100, () => setCurrentCategory(category))}
      onClick={handleGetCategoryClickHandler(category)}
    >
      <CategoryListItemText isCurrent={category.id === currentCategory?.id}>
        {category.name}
      </CategoryListItemText>
    </CategoryListItem>
  ));

  const childItems = currentCategory?.childCategories.map((category) => (
    <CategoryListItem
      key={category.id}
      onMouseEnter={clearDebounce}
      onClick={handleGetCategoryClickHandler(category)}
    >
      <CategoryListItemText>{category.name}</CategoryListItemText>
    </CategoryListItem>
  ));

  return (
    <Container>
      <CategoryList isRoot={true}>{rootItems}</CategoryList>
      {currentCategory?.id !== CATEGORY_ALL.id && (
        <CategoryList isRoot={false} data-testid="child-list">
          {childItems}
        </CategoryList>
      )}
    </Container>
  );
};

export default CategoryLayer;

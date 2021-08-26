import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { rootListStyle, childListStyle, textUnderline } from './categoryLayerCss';
import { CategoryClickHandler, CategoryAll } from '../../../../containers/CategoryLayerContainer';
import { useHistory } from '../../../../lib/router';
import Category from '../../../../models/category';
import { Option } from '../../../../types/option';
import buildQueryString from '../../../../utils/build-query-string';
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
  ${(props) => (props.isCurrent ? textUnderline : '')};
`;

export type Props = {
  rootCategories: Category[];
  onCategoryClick: CategoryClickHandler;
  option: Option;
};

const CategoryLayer = (props: Props): JSX.Element => {
  const { rootCategories, onCategoryClick, option } = props;
  const [currentCategory, setCurrentCategory] = useState(rootCategories[0]);
  const history = useHistory();

  const handleGetCategoryClickHandler = useCallback(
    (category: Category) => () => {
      const query = buildQueryString({
        ...option,
        category: category === CategoryAll ? null : category.id,
        searchTerm: '',
      });
      history.push(`/products${query}`);
      onCategoryClick(category);
    },
    [onCategoryClick, option, history]
  );

  const rootItems = rootCategories.map((category) => (
    <CategoryListItem
      key={category.id}
      isCurrent={category.id === currentCategory.id}
      onMouseEnter={() => debounce(100, () => setCurrentCategory(category))}
      onClick={handleGetCategoryClickHandler(category)}
    >
      <CategoryListItemText isCurrent={category.id === currentCategory.id}>
        {category.name}
      </CategoryListItemText>
    </CategoryListItem>
  ));

  const childItems = currentCategory.childCategories.map((category) => (
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
      {currentCategory !== CategoryAll && (
        <CategoryList isRoot={false} data-testid="child-list">
          {childItems}
        </CategoryList>
      )}
    </Container>
  );
};

export default CategoryLayer;

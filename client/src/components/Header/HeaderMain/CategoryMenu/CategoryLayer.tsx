import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { CategoryClickHandler } from '../../../../containers/CategoryLayerContainer';
import { useHistory } from '../../../../lib/router';
import Category from '../../../../models/category';
import { Option } from '../../../../types/option';
import buildQueryString from '../../../../utils/build-query-string';

const Container = styled.div`
  position: absolute;
  top: calc(100% + 5px);
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

  background-color: ${(props) =>
    props.isRoot ? props.theme.color.white1 : props.theme.color.white2};
`;

type CategoryListItemProps = {
  isCurrent: boolean;
};

const CategoryListItem = styled.li<CategoryListItemProps>`
  padding: 12px 20px;

  background-color: ${(props) =>
    props.isCurrent ? props.theme.color.white2 : props.theme.color.white1};
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
        category: category.id,
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
      onMouseEnter={() => setCurrentCategory(category)}
      onClick={handleGetCategoryClickHandler(category)}
    >
      {category.name}
    </CategoryListItem>
  ));

  const childItems = currentCategory.childCategories.map((category) => (
    <CategoryListItem
      isCurrent={true}
      key={category.id}
      onClick={handleGetCategoryClickHandler(category)}
    >
      {category.name}
    </CategoryListItem>
  ));

  return (
    <Container>
      <CategoryList isRoot={true}>{rootItems}</CategoryList>
      <CategoryList isRoot={false} data-testid="child-list">
        {childItems}
      </CategoryList>
    </Container>
  );
};

export default CategoryLayer;

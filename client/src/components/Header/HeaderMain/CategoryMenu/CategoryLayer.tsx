import React, { useState } from 'react';
import styled from 'styled-components';
import { categories } from './dummy';

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

const CategoryLayer = (): JSX.Element => {
  const rootCategories = categories.filter(({ parentCategory }) => parentCategory === null);
  const [currentCategory, setCurrentCategory] = useState(rootCategories[0]);

  const rootItems = rootCategories.map((category) => (
    <CategoryListItem
      key={category.id}
      isCurrent={category.id === currentCategory.id}
      onMouseEnter={() => setCurrentCategory(category)}
    >
      {category.name}
    </CategoryListItem>
  ));

  const childItems = currentCategory.childCategories.map((category) => (
    <CategoryListItem isCurrent={true} key={category.id}>
      {category.name}
    </CategoryListItem>
  ));

  return (
    <Container>
      <CategoryList isRoot={true}>{rootItems}</CategoryList>
      <CategoryList isRoot={false}>{childItems}</CategoryList>
    </Container>
  );
};

export default CategoryLayer;

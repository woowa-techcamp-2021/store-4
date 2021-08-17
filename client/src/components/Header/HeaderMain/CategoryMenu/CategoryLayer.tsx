import React, { useState } from 'react';
import styled from 'styled-components';
import { categories } from './dummy';

const HOVER_COLOR = '#f9f9f9';

const Wrapper = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 290px;
  min-height: 300px;
  display: flex;
  flex-direction: row;
  border: 1px solid #333;
  cursor: pointer;
`;

const CategoryList = styled.ul`
  flex: 1;
  list-style: none;
  margin: 0;
  padding: 0;

  background-color: ${(props) => (props.className === 'child' ? HOVER_COLOR : '#fff')};
`;

const CategoryListItem = styled.li`
  padding: 12px 20px;

  &.current {
    background-color: ${HOVER_COLOR};
  }
`;

const CategoryLayer = (): JSX.Element => {
  const rootCategories = categories.filter(({ parentCategory }) => parentCategory === null);
  const [currentCategory, setCurrentCategory] = useState(rootCategories[0]);

  const rootItems = rootCategories.map((category) => (
    <CategoryListItem
      key={category.id}
      className={category.id === currentCategory.id ? 'current' : ''}
      onMouseEnter={() => setCurrentCategory(category)}
    >
      {category.name}
    </CategoryListItem>
  ));

  const childItems = currentCategory.childCategories.map((category) => (
    <CategoryListItem key={category.id}>{category.name}</CategoryListItem>
  ));

  return (
    <Wrapper>
      <CategoryList>{rootItems}</CategoryList>
      <CategoryList className="child">{childItems}</CategoryList>
    </Wrapper>
  );
};

export default CategoryLayer;

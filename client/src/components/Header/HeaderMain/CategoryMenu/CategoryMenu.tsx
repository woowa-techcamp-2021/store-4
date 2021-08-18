import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import MENU_ICON from './menuIcon.png';
import CategoryLayer from './CategoryLayer';

const CATEGORY_BUTTON_TEXT = '전체 카테고리';

const Container = styled.div`
  position: relative;
`;

const CategoryMenuButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CategoryMenuButtonIcon = styled.img`
  width: 20px;
  height: auto;
  margin-right: 8px;
`;

const CategoryMenuButtonText = styled.span`
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.color.grey5};
`;

const CategoryMenu = (): JSX.Element => {
  const [showLayer, setShowLayer] = useState(false);
  const handleLayerButtonClick = useCallback(
    () => setShowLayer((prevShowLayer) => !prevShowLayer),
    [setShowLayer]
  );
  const closeLayer = useCallback(() => {
    if (showLayer) setShowLayer(false);
  }, [showLayer, setShowLayer]);

  useEffect(() => {
    document.addEventListener('click', closeLayer);
    return () => document.removeEventListener('click', closeLayer);
  }, [closeLayer]);

  return (
    <Container>
      <CategoryMenuButton onClick={handleLayerButtonClick}>
        <CategoryMenuButtonIcon src={MENU_ICON} />
        <CategoryMenuButtonText>{CATEGORY_BUTTON_TEXT}</CategoryMenuButtonText>
      </CategoryMenuButton>
      {showLayer && <CategoryLayer />}
    </Container>
  );
};

export default CategoryMenu;

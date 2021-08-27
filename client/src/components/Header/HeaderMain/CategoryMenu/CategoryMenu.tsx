import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryLayerContainer from '../../../../containers/CategoryLayerContainer';
import { RiMenuFill } from 'react-icons/ri';

const CATEGORY_BUTTON_TEXT = '카테고리';

const Container = styled.div`
  position: relative;
`;

const CategoryMenuButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CategoryMenuButtonIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  font-size: ${(props) => props.theme.fontSize.medium};
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
        <CategoryMenuButtonIcon>
          <RiMenuFill />
        </CategoryMenuButtonIcon>
        <CategoryMenuButtonText>{CATEGORY_BUTTON_TEXT}</CategoryMenuButtonText>
      </CategoryMenuButton>
      {showLayer && <CategoryLayerContainer />}
    </Container>
  );
};

export default CategoryMenu;

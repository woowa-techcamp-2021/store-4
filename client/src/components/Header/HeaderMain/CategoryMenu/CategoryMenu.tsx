import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import menuIcon from './menuIcon.png';
import CategoryLayer from './CategoryLayer';

const Wrapper = styled.div`
  position: relative;

  .button {
    display: flex;
    align-items: center;
    cursor: pointer;

    .icon {
      width: 20px;
      height: auto;

      margin-right: 8px;
    }

    .text {
      font-size: 14px;
      color: #333;
    }
  }
`;

const CategoryMenu = (): JSX.Element => {
  const [showLayer, setShowLayer] = useState(false);
  const handleLayerButtonClick = useCallback(
    () => setShowLayer(!showLayer),
    [showLayer, setShowLayer]
  );
  const closeLayer = useCallback(() => {
    if (showLayer) setShowLayer(false);
  }, [showLayer, setShowLayer]);

  useEffect(() => {
    document.addEventListener('click', closeLayer);
    return () => document.removeEventListener('click', closeLayer);
  }, [closeLayer]);

  return (
    <Wrapper>
      <div className="button" onClick={handleLayerButtonClick}>
        <img className="icon" src={menuIcon} />
        <span className="text">전체 카테고리</span>
      </div>
      {showLayer ? <CategoryLayer /> : null}
    </Wrapper>
  );
};

export default CategoryMenu;

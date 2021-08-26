import React from 'react';
import styled from 'styled-components';
import { Wish } from '../../../types/Wish';

const TextTinyBold = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: 700;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 92px;
  &:not(:first-child) {
    border-top: 1px solid ${(props) => props.theme.color.grey3};
  }
`;

const ItemTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 10px;
`;

const ItemImg = styled.img`
  width: 52px;
  height: 52px;
  padding-right: 10px;
`;

const ItemWrapper = styled.div``;

const ItemTitle = styled(TextTinyBold)``;

type Props = {
  wishItem: Wish;
};

const WishItem = (props: Props): JSX.Element => {
  const { wishItem } = props;
  const { id, title, imgSrc } = wishItem;

  return (
    <Container>
      <ItemTitleWrapper>
        <ItemImg src={imgSrc} />
        <ItemWrapper>
          <ItemTitle data-testid="item-title">{title}</ItemTitle>
        </ItemWrapper>
      </ItemTitleWrapper>
    </Container>
  );
};

export default WishItem;

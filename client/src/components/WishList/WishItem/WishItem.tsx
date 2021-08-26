import React from 'react';
import styled, { css } from 'styled-components';
import { Wish } from '../../../types/Wish';
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from '../../../lib/router';

const TextTinyBold = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: 600;
`;

const CommonButton = styled.button`
  height: 50px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 92px;
  padding: 0px 20px;
  border-bottom: 1px solid ${(props) => props.theme.color.grey3};

  :hover {
    background-color: ${(props) => props.theme.color.grey1};
  }
`;

type WishButtonProps = {
  isWished: boolean;
};

const WishButton = styled(CommonButton)<WishButtonProps>`
  border: 1px solid ${(props) => props.theme.color.grey1};
  background-color: ${(props) => props.theme.color.white1};
  width: 50px;
  font-size: ${(props) => props.theme.fontSize.large};
  ${(props) =>
    props.isWished
      ? css`
          color: ${(props) => props.theme.color.red};
        `
      : css`
          color: ${(props) => props.theme.color.grey3};
        `};
`;

const ItemTitleWrapper = styled.div`
  display: flex;
  width: 700px;
  height: 80px;
  align-items: center;
  padding: 0 20px;
`;

const ItemImg = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  padding-right: 10px;
`;

const ItemWrapper = styled.div``;

const ItemTitle = styled(TextTinyBold)`
  padding-left: 10px;
`;

type Props = {
  wishItem: Wish;
};

const WishItem = (props: Props): JSX.Element => {
  const [isWished, setIsWished] = useState(true);

  const { wishItem } = props;
  const { id, title, imgSrc } = wishItem;

  const onWishClick = () => {
    if (isWished) {
      // 상품 찜 취소 api 요청
      setIsWished(false);
    } else {
      // 상품 찜 추가 api 요청
      setIsWished(true);
    }
  };

  return (
    <Container>
      <WishButton onClick={onWishClick} isWished={isWished}>
        <FaHeart />
      </WishButton>
      <Link to={`product/${id}`}>
        <ItemTitleWrapper>
          <ItemImg src={imgSrc} />
          <ItemWrapper>
            <ItemTitle data-testid="item-title">{title}</ItemTitle>
          </ItemWrapper>
        </ItemTitleWrapper>
      </Link>
    </Container>
  );
};

export default WishItem;

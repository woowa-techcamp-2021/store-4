import React from 'react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from '../../../lib/router';
import wishStore from '../../../stores/wishStore';
import LazyImage from '../../LazyImage/LazyImage';

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
  border: none;
  border-radius: 100%;
  background-color: inherit;
  width: 50px;
  font-size: ${(props) => props.theme.fontSize.large};
  color: ${(props) => (props.isWished ? props.theme.color.red : props.theme.color.grey3)};
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: ${(props) => props.theme.color.white1};
  }
`;

const ItemTitleWrapper = styled.div`
  display: flex;
  width: 700px;
  height: 80px;
  align-items: center;
  padding: 0 20px;
`;

const ItemWrapper = styled.div`
  padding-left: 10px;
`;

const ItemTitle = styled(TextTinyBold)`
  padding-left: 10px;
`;

type Props = {
  productId: number;
  title: string;
  imgSrc: string;
};

const WishItem = (props: Props): JSX.Element => {
  const [isWished, setIsWished] = useState(true);

  const { productId, title, imgSrc } = props;

  const onWishClick = async () => {
    if (isWished) {
      await wishStore.changeWishedTo(productId, false);
      setIsWished(false);
    } else {
      await wishStore.changeWishedTo(productId, true);
      setIsWished(true);
    }
  };

  return (
    <Container>
      <WishButton onClick={onWishClick} isWished={isWished}>
        <FaHeart />
      </WishButton>
      <Link to={`product/${productId}`}>
        <ItemTitleWrapper>
          <LazyImage width={60} height={60} src={imgSrc} objectFit={'cover'} alt="상품 이미지" />
          <ItemWrapper>
            <ItemTitle data-testid="item-title">{title}</ItemTitle>
          </ItemWrapper>
        </ItemTitleWrapper>
      </Link>
    </Container>
  );
};

export default WishItem;

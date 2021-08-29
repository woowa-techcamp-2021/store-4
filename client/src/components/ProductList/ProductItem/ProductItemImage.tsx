import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import LazyImage from '../../LazyImage/LazyImage';

const Container = styled.div``;

const BadgeWrapper = styled.div`
  position: absolute;
  display: flex;
  padding: 8px 8px;
  top: 0;
`;

const Badge = styled.div`
  color: ${(props) => props.theme.color.white1};
  font-weight: 700;
  padding: 4px 8px;
  margin-right: 12px;
  border-radius: 4px;
`;

const NewBadge = styled(Badge)`
  background-color: ${(props) => props.theme.color.mint2};
`;
const SalesBadge = styled(Badge)`
  background-color: ${(props) => props.theme.color.red};
`;

const ProductWishWrapper = styled.div`
  bottom: 0px;
  position: absolute;
  width: 100%;
  height: 50%;
  display: none;

  background: linear-gradient(
    ${(props) => props.theme.color.black}00,
    ${(props) => props.theme.color.black}80
  );
`;

type WishIconProps = {
  isWished: boolean;
};

const WishIcon = styled.div<WishIconProps>`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSize.large};
  color: ${(props) => (props.isWished ? props.theme.color.red : props.theme.color.white1)};

  .product-wish-icon {
    transition: all 0.125s;

    :active {
      transform: scale(0.8);
    }
  }
`;

type Props = {
  thumbnail: string | null;
  isNew: boolean;
  isDiscounting: boolean;
  isWished: boolean;
  onWishClick: MouseEventHandler;
};

const ProductItemImage = (props: Props): JSX.Element => {
  const { thumbnail, isNew, isDiscounting, isWished, onWishClick } = props;

  return (
    <Container>
      <LazyImage src={thumbnail} width={280} aspectRatio={[4, 5]} alt="상품 이미지">
        <BadgeWrapper>
          {isNew && <NewBadge>NEW</NewBadge>}
          {isDiscounting && <SalesBadge>SALE</SalesBadge>}
        </BadgeWrapper>
        <ProductWishWrapper className="product-wish-wrapper">
          <WishIcon isWished={isWished}>
            <FaHeart className="product-wish-icon" onClick={onWishClick} />
          </WishIcon>
        </ProductWishWrapper>
      </LazyImage>
    </Container>
  );
};

export default ProductItemImage;

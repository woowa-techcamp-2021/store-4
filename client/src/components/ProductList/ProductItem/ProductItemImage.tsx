import React, { MouseEventHandler, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import NoImage from '../../../assets/images/no-image.png';
import { FaHeart } from 'react-icons/fa';
import { show } from '../../../styles/animation';

const Container = styled.div`
  .none {
    display: none;
  }

  .animation-show {
    ${show}
  }
`;

const ImageWrapper = styled.div`
  position: relative;

  :hover {
    .product-wish-wrapper {
      display: inherit;
    }
  }
`;

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

const Img = styled.img`
  width: 100%;
  min-height: 350px;
`;

const loading = keyframes`
  from{
    transform: translateY(-200%);
  }

  to{
    transform: translateY(200%);
  }
`;

const ImgSkeleton = styled.div`
  position: relative;
  overflow-y: hidden;
  width: 100%;
  min-height: 350px;
  background-color: ${(props) => props.theme.color.grey1};
  border: none;
  ::after {
    content: ' ';
    width: 100%;
    min-height: 200px;
    position: absolute;
    background: linear-gradient(to top, #ededed, #f4f4f4, #ededed);
    animation: ${loading} 2s infinite ease-out;
  }
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

const lazy = (img: HTMLImageElement | null) => {
  return new Promise<HTMLImageElement>((res, rej) => {
    if (img) {
      img.onload = () => {
        res(img);
      };
      img.onerror = (err) => {
        rej(err);
      };
      img.src = img.dataset.src as string;
    }
  });
};

type Props = {
  thumbnail: string | null;
  isNew: boolean;
  isDiscounting: boolean;
  isWished: boolean;
  onWishClick: MouseEventHandler;
};

const ProductItemImage = (props: Props): JSX.Element => {
  const { thumbnail, isNew, isDiscounting, isWished, onWishClick } = props;
  const imgRef = useRef<HTMLImageElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const imgSkeletonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lazy(imgRef.current).then((img) => {
      imgWrapperRef.current?.classList.remove('none');
      imgSkeletonRef.current?.classList.add('none');
      img.classList.remove('hide');
      img.classList.add('animation-show');
    });
  }, []);

  return (
    <Container>
      <ImgSkeleton ref={imgSkeletonRef} className="image-skeleton" />
      <ImageWrapper ref={imgWrapperRef} className="image-wrapper none">
        <Img
          referrerPolicy="no-referrer"
          className="thumbnail hide"
          ref={imgRef}
          data-src={thumbnail || NoImage}
        />
        <BadgeWrapper>
          {isNew && <NewBadge>NEW</NewBadge>}
          {isDiscounting && <SalesBadge>SALE</SalesBadge>}
        </BadgeWrapper>
        <ProductWishWrapper className="product-wish-wrapper">
          <WishIcon isWished={isWished}>
            <FaHeart className="product-wish-icon" onClick={onWishClick} />
          </WishIcon>
        </ProductWishWrapper>
      </ImageWrapper>
    </Container>
  );
};

export default ProductItemImage;

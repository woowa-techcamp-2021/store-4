import React from 'react';
import styled from 'styled-components';
import NoImage from '../../../assets/images/no-image.png';

const ImageWrapper = styled.div`
  position: relative;
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
`;

type Props = {
  thumbnail: string | null;
  isNew: boolean;
  isDiscounting: boolean;
};

const ProductItemImage = (props: Props): JSX.Element => {
  const { thumbnail, isNew, isDiscounting } = props;
  return (
    <ImageWrapper>
      <Img referrerPolicy="no-referrer" src={thumbnail || NoImage} />
      <BadgeWrapper>
        {isNew && <NewBadge>NEW</NewBadge>}
        {isDiscounting && <SalesBadge>SALE</SalesBadge>}
      </BadgeWrapper>
    </ImageWrapper>
  );
};

export default ProductItemImage;

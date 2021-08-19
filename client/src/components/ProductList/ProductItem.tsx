import React from 'react';
import { toKoreanMoneyFormat } from '../../utils/moneyFormater';
import styled from 'styled-components';
import { Link } from '../../lib/router';
import Product from '../../models/product';
import NoImage from '../../assets/images/no-image.png';

const ProductItemContainer = styled.li`
  list-style: none;

  box-sizing: border-box;
  width: 280px;
  margin-bottom: 32px;
`;

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

const DescriptionWrapper = styled.div`
  margin-top: 10px;
`;

const Name = styled.div`
  font-size: ${(props) => props.theme.fontSize.normal};
`;

const DiscountRate = styled.div`
  color: ${(props) => props.theme.color.red};
  font-size: ${(props) => props.theme.fontSize.medium};
  font-family: 'Montserrat' 'Nanum Gothic', 'Noto Sans KR', -apple-system, system-ui,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  margin-bottom: 10px;
`;

const PriceWrapper = styled.div`
  margin: 8px 0px;
`;

const NormalPrice = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-family: 'Montserrat' 'Nanum Gothic', 'Noto Sans KR', -apple-system, system-ui,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: ${(props) => props.theme.color.grey5};
  text-decoration: line-through;
`;

const Price = styled.div`
  font-size: ${(props) => props.theme.fontSize.normal};
  font-family: 'Montserrat' 'Nanum Gothic', 'Noto Sans KR', -apple-system, system-ui,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
`;

type Props = {
  product: Product;
};

const ProductItem = (props: Props): React.ReactElement => {
  const { product } = props;
  const { id, name, price, thumbnail, discountRate, isDiscountRate, discountedPrice, isNew } =
    product;

  return (
    <Link to={`/product/${id}`}>
      <ProductItemContainer>
        <ImageWrapper>
          <Img src={thumbnail || NoImage} />
          <BadgeWrapper>
            {isNew && <NewBadge>NEW</NewBadge>}
            {isDiscountRate && <SalesBadge>SALE</SalesBadge>}
          </BadgeWrapper>
        </ImageWrapper>
        <DescriptionWrapper>
          {isDiscountRate && <DiscountRate>{discountRate}%</DiscountRate>}
          <Name>{name}</Name>
          {isDiscountRate ? (
            <PriceWrapper>
              <NormalPrice data-testid="price">{toKoreanMoneyFormat(price)}</NormalPrice>
              <Price data-testid="discountedPrice">{toKoreanMoneyFormat(discountedPrice)}</Price>
            </PriceWrapper>
          ) : (
            <PriceWrapper>
              <Price data-testid="price">{toKoreanMoneyFormat(price)}</Price>
            </PriceWrapper>
          )}
        </DescriptionWrapper>
      </ProductItemContainer>
    </Link>
  );
};

export default ProductItem;

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
  const { id, name, price, thumbnail, discountRate } = product;

  return (
    <Link to={`/product/${id}`}>
      <ProductItemContainer>
        <Img src={thumbnail || NoImage} />
        <DescriptionWrapper>
          {discountRate > 0 && <DiscountRate>{discountRate}%</DiscountRate>}
          <Name>{name}</Name>
          {discountRate > 0 ? (
            <PriceWrapper>
              <NormalPrice>{toKoreanMoneyFormat(price)}</NormalPrice>
              <Price>{toKoreanMoneyFormat(product.discountedPrice)}</Price>
            </PriceWrapper>
          ) : (
            <PriceWrapper>
              <Price>{toKoreanMoneyFormat(price)}</Price>
            </PriceWrapper>
          )}
        </DescriptionWrapper>
      </ProductItemContainer>
    </Link>
  );
};

export default ProductItem;

import React from 'react';
import styled from 'styled-components';
import OrderDetail from '../../../../models/orderDetail';
import { toKoreanMoneyFormat } from '../../../../utils/moneyFormater';
import { Link } from '../../../../lib/router';
import LazyImage from '../../../LazyImage/LazyImage';

const Container = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.color.grey2};
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin: 10px 0px;
`;

const ProductThumbnailWrapper = styled(Column)``;

const ProductNameWrapper = styled(Column)`
  flex: 2;
  :hover {
    color: ${(props) => props.theme.color.grey3};
  }
`;

const ProductName = styled.div`
  width: 220px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ProductOption = styled(Column)`
  flex: 2;
`;
const Quantity = styled(Column)`
  flex: 1;
`;
const Price = styled(Column)`
  flex: 2;
  display: flex;
`;

const OriginPrice = styled.div``;

const DiscountRate = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.color.grey4};
`;

type Props = {
  orderDetails: OrderDetail[];
};

const AccountOrderTableItemDetail = (props: Props): JSX.Element => {
  const { orderDetails } = props;

  const OrderDetailItems = orderDetails.map((orderDetail) => {
    return (
      <Row key={orderDetail.id}>
        <ProductThumbnailWrapper>
          <Link to={`/product/${orderDetail.product.id}`}>
            <LazyImage
              width={48}
              aspectRatio={[4, 5]}
              src={orderDetail.product.thumbnail}
              alt="상품 이미지"
            />
          </Link>
        </ProductThumbnailWrapper>
        <ProductNameWrapper>
          <Link to={`/product/${orderDetail.product.id}`}>
            <ProductName>{orderDetail.product.name}</ProductName>
          </Link>
        </ProductNameWrapper>
        <ProductOption>{orderDetail.option || ''}</ProductOption>
        <Quantity>{`${orderDetail.quantity}개`}</Quantity>
        <Price>
          <OriginPrice>{toKoreanMoneyFormat(orderDetail.price * orderDetail.quantity)}</OriginPrice>
          {orderDetail.discountRate > 0 && (
            <DiscountRate>{`(${orderDetail.discountRate}%)`}</DiscountRate>
          )}
        </Price>
      </Row>
    );
  });

  return <Container>{OrderDetailItems}</Container>;
};

export default AccountOrderTableItemDetail;

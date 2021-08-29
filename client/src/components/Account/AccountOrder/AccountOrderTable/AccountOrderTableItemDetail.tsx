import React from 'react';
import styled from 'styled-components';
import OrderDetail from '../../../../models/orderDetail';
import NO_IMAGE from '../../../../assets/images/no-image.png';
import { toKoreanMoneyFormat } from '../../../../utils/moneyFormater';
import { Link } from '../../../../lib/router';

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

const ProductThumbnail = styled.img`
  height: 60px;
  :hover {
    transform: scale(1.1);
  }
`;

const ProductName = styled(Column)`
  flex: 2;
  overflow: scroll;
  white-space: nowrap;
  text-overflow: ellipsis;
  :hover {
    color: ${(props) => props.theme.color.grey5};
  }
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
            <ProductThumbnail
              referrerPolicy="no-referrer"
              src={orderDetail.product.thumbnail || NO_IMAGE}
            />
          </Link>
        </ProductThumbnailWrapper>
        <ProductName>
          <Link to={`/product/${orderDetail.product.id}`}>{orderDetail.product.name}</Link>
        </ProductName>
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

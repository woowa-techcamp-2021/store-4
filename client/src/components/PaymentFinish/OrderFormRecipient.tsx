import React from 'react';
import styled from 'styled-components';
import {
  Row,
  RowTitle,
  Column,
  Label,
  InputWrapper,
} from '../OrderPayment/OrderForm/OrderFormStyledComponent';

const Username = styled.div``;
const Email = styled.div``;

type Props = {
  recipientName: string;
  address: string;
};

const OrderFormRecipient = (props: Props): JSX.Element => {
  const { recipientName, address } = props;

  return (
    <Row>
      <RowTitle>배송 정보</RowTitle>
      <Column>
        <Label>받으실 분</Label>
        <InputWrapper>
          <Username>{recipientName}</Username>
        </InputWrapper>
      </Column>
      <Column>
        <Label>받으실 곳</Label>
        <InputWrapper>
          <Email>{address}</Email>
        </InputWrapper>
      </Column>
    </Row>
  );
};

export default OrderFormRecipient;

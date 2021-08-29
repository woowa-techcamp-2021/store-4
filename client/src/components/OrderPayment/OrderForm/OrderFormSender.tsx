import React from 'react';
import styled from 'styled-components';
import { Row, RowTitle, Column, Label, InputWrapper } from './OrderFormStyledComponent';

const Username = styled.div``;
const Email = styled.div``;

type Props = {
  username?: string;
  email?: string;
};

const OrderFormSender = (props: Props): JSX.Element => {
  const { username, email } = props;

  return (
    <Row>
      <RowTitle>주문자 정보</RowTitle>
      <Column>
        <Label>주문하시는 분</Label>
        <InputWrapper>
          <Username>{username}</Username>
        </InputWrapper>
      </Column>
      <Column>
        <Label>이메일</Label>
        <InputWrapper>
          <Email>{email}</Email>
        </InputWrapper>
      </Column>
    </Row>
  );
};

export default OrderFormSender;

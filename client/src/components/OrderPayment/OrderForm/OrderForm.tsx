import { observer } from 'mobx-react';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import { OrderDeliveryAddressFormRef } from '../../../containers/OrderPaymentContainer';
import orderStore from '../../../stores/orderStore';
import userStore from '../../../stores/userStore';
import { isNotNone } from '../../../utils/typeGuard';
import { Row, RowTitle, Column, Label, InputWrapper, Input } from './OrderFormStyledComponent';
import OrderFormSender from './OrderFormSender';
import FinalPaymentAmount from './FinalPaymentAmount';

const Container = styled.div`
  border: none;
  padding: 5px 8px;
  outline: none;
  color: ${(props) => props.theme.color.grey5};
`;

const RecipientName = styled(Input)``;
const RecipientAddress = styled(Input)``;

const FinalCheckWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FinalCheckDesc = styled.div`
  margin: 20px 0px;
`;

const FinalCheck = styled.div`
  margin: 20px 0px;
  display: flex;
  align-items: center;
`;

const Strong = styled.strong``;

const Paragraph = styled.p`
  text-align: center;
  white-space: pre;
  line-height: 1.5;
  margin: 0px 8px;
`;

const PaymentButton = styled.button`
  color: ${(props) => props.theme.color.white1};
  width: 280px;
  height: 60px;
  background-color: ${(props) => props.theme.color.mint2};
  border: none;
  border-radius: 4px;
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.color.mint3};
  }
`;

const OrderForm = (_: unknown, ref: React.Ref<OrderDeliveryAddressFormRef>): JSX.Element => {
  const recipientNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const user = userStore.user;
  const finalPaymentAmount = orderStore.totalPrice;

  useImperativeHandle(
    ref,
    () => ({
      get recipientName(): string {
        return recipientNameRef.current?.value ?? '';
      },
      get address(): string {
        return addressRef.current?.value ?? '';
      },
      set recipientName(value: string) {
        if (isNotNone(recipientNameRef.current)) {
          recipientNameRef.current.value = value;
        }
      },
      set address(value: string) {
        if (isNotNone(addressRef.current)) {
          addressRef.current.value = value;
        }
      },
    }),
    []
  );

  return (
    <Container>
      <OrderFormSender username={user?.name} email={user?.email} />

      <Row>
        <RowTitle>배송정보</RowTitle>
        <Column>
          <Label>받으실 분</Label>
          <InputWrapper>
            <RecipientName ref={recipientNameRef} defaultValue={''} placeholder="받으실 분" />
          </InputWrapper>
        </Column>
        <Column>
          <Label>받으실 곳</Label>
          <InputWrapper>
            <RecipientAddress
              width={'440px'}
              ref={addressRef}
              defaultValue={''}
              placeholder="받으실 곳"
            />
          </InputWrapper>
        </Column>
      </Row>

      <FinalPaymentAmount finalPaymentAmount={finalPaymentAmount} />

      <FinalCheckWrapper>
        <FinalCheckDesc>
          <Paragraph>
            {`전자상거래 등에서의 소비자보호에 관한 법률에 의거하여 미성년자가 물품을 구매하는 경우,\n법정대리인이 동의하지 않으면 미성년자 본인 또는 법정대리인이 구매를 취소할 수 있습니다.`}
          </Paragraph>
        </FinalCheckDesc>
        <FinalCheck>
          <input type="checkbox" />
          <Paragraph>
            <Strong>(필수)</Strong> 구매하실 상품의 결제정보를 확인하였으며, 구매진행에 동의합니다.
          </Paragraph>
        </FinalCheck>
        <FinalCheck>
          <PaymentButton>결제하기</PaymentButton>
        </FinalCheck>
      </FinalCheckWrapper>
    </Container>
  );
};

export default observer(forwardRef(OrderForm));

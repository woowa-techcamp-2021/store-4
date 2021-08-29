import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import { OrderDeliveryAddressFormRef } from '../../../containers/OrderPaymentContainer';
import orderStore from '../../../stores/orderStore';
import userStore from '../../../stores/userStore';
import { isNotNone } from '../../../utils/typeGuard';
import { Row, RowTitle, Column, Label, InputWrapper, Input } from './OrderFormStyledComponent';
import OrderFormSender from './OrderFormSender';
import FinalPaymentAmount from './FinalPaymentAmount';
import DeliveryAddress from '../../../models/delivery-address';

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

const DeliverySelect = styled.select``;

const Option = styled.option``;

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

const setValueAtRef = <T extends HTMLInputElement>(
  target: React.RefObject<T> | null,
  str: string
) => {
  if (isNotNone(target)) {
    if (isNotNone(target.current)) {
      target.current.value = str;
    }
  }
};

type Props = {
  onOrderSubmit: React.MouseEventHandler;
  deliveryAddresses: DeliveryAddress[];
};

const OrderForm = (props: Props, ref: React.Ref<OrderDeliveryAddressFormRef>): JSX.Element => {
  const { onOrderSubmit, deliveryAddresses } = props;
  const [currentAddress, setAddress] = useState<DeliveryAddress | undefined>();

  const recipientNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const approveRef = useRef<HTMLInputElement>(null);

  const user = userStore.user;
  const finalPaymentAmount = orderStore.totalPrice;

  const Options = deliveryAddresses.map((deliveryAddress) => {
    return (
      <Option key={deliveryAddress.id} value={deliveryAddress.id}>
        {deliveryAddress.name}
      </Option>
    );
  });

  const handleChangeAddress = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { target } = event;

    if (target.value === 'none') {
      setValueAtRef(recipientNameRef, '');
      setValueAtRef(addressRef, '');
      setAddress(undefined);
      return;
    }

    const foundAddress = deliveryAddresses.find(
      (deliveryAddress) => deliveryAddress.id === +target.value
    );

    if (isNotNone(foundAddress)) {
      setValueAtRef(recipientNameRef, foundAddress.recipientName);
      setValueAtRef(addressRef, foundAddress.address);

      setAddress(foundAddress);
    }
  };

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
      get approve(): boolean {
        return approveRef.current?.checked ?? false;
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
          <Label>배송지 선택</Label>
          <InputWrapper>
            {deliveryAddresses.length > 0 ? (
              <DeliverySelect value={currentAddress?.id ?? 'none'} onChange={handleChangeAddress}>
                <Option key={'none'} value="none">
                  직접 입력
                </Option>
                {Options}
              </DeliverySelect>
            ) : (
              '마이페이지에서 배송지를 추가하세요'
            )}
          </InputWrapper>
        </Column>
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
          <input type="checkbox" ref={approveRef} />
          <Paragraph>
            <Strong>(필수)</Strong> 구매하실 상품의 결제정보를 확인하였으며, 구매진행에 동의합니다.
          </Paragraph>
        </FinalCheck>
        <FinalCheck>
          <PaymentButton onClick={onOrderSubmit}>결제하기</PaymentButton>
        </FinalCheck>
      </FinalCheckWrapper>
    </Container>
  );
};

export default forwardRef(OrderForm);

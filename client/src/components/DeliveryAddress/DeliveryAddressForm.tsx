import React, { forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import { DeliveryAddressFormRef } from '../../containers/ManageDeliveryAddressContainer';
import DeliveryAddress from '../../models/delivery-address';
import { isNotNone } from '../../utils/typeGuard';

const Container = styled.div`
  border: none;
  padding: 5px 8px;
  outline: none;
  color: ${(props) => props.theme.color.grey5};
`;

const DeliveryAddressFormInput = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.color.grey1};
  padding: 5px 8px;
  outline: none;
  color: ${(props) => props.theme.color.grey5};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  gap: 8px;
`;

const DeliveryAddressNickName = styled(DeliveryAddressFormInput)`
  font-size: ${(props) => props.theme.fontSize.medium};
  font-weight: bold;
`;

const Address = styled(DeliveryAddressFormInput)`
  width: 500px;
`;

const RecipientName = styled(DeliveryAddressFormInput)``;

const RecipientPhoneNumber = styled(DeliveryAddressFormInput)``;

type Props = {
  deliveryAddress?: DeliveryAddress;
};

const DeliveryAddressForm = (props: Props, ref: Ref<DeliveryAddressFormRef>): JSX.Element => {
  const { deliveryAddress } = props;

  const nameRef = useRef<HTMLInputElement>(null);
  const recipientNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const recipientPhoneNumberRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      get name(): string {
        return nameRef.current?.value ?? '';
      },
      get recipientName(): string {
        return recipientNameRef.current?.value ?? '';
      },
      get address(): string {
        return addressRef.current?.value ?? '';
      },
      get recipientPhoneNumber(): string {
        return recipientPhoneNumberRef.current?.value ?? '';
      },
      set name(value: string) {
        if (isNotNone(nameRef.current)) {
          nameRef.current.value = value;
        }
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
      set recipientPhoneNumber(value: string) {
        if (isNotNone(recipientPhoneNumberRef.current)) {
          recipientPhoneNumberRef.current.value = value;
        }
      },
    }),
    []
  );

  return (
    <Container>
      <DeliveryAddressNickName
        ref={nameRef}
        defaultValue={deliveryAddress?.name}
        placeholder="이름"
      />
      <Row>
        <Address ref={addressRef} defaultValue={deliveryAddress?.address} placeholder="배송지" />
      </Row>

      <Row>
        <RecipientName
          ref={recipientNameRef}
          defaultValue={deliveryAddress?.recipientName}
          placeholder="수령인"
        />
        <RecipientPhoneNumber
          ref={recipientPhoneNumberRef}
          defaultValue={deliveryAddress?.recipientPhoneNumber}
          placeholder="수령인 전화번호"
        />
      </Row>
    </Container>
  );
};

export default forwardRef<DeliveryAddressFormRef, Props>(DeliveryAddressForm);

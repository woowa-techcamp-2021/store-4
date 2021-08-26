import React, { forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import {
  DeliveryAddressFormRef,
  FormInputs,
} from '../../containers/ManageDeliveryAddressContainer';
import DeliveryAddress from '../../models/delivery-address';
import { isNotNone } from '../../utils/typeGuard';

const Container = styled.div`
  border: none;
  padding: 5px 8px;
  outline: none;
  color: ${(props) => props.theme.color.grey5};

  .warning {
    border: 1px solid ${(props) => props.theme.color.red};
  }
`;

const DeliveryAddressFormInput = styled.input`
  font-size: ${(props) => props.theme.fontSize.small};
  border: 1px solid ${(props) => props.theme.color.grey1};
  border-radius: 3px;
  padding: 8px;
  outline: none;
  color: ${(props) => props.theme.color.grey5};

  &:focus {
    border-color: ${(props) => props.theme.color.mint2};
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
  gap: 8px;
`;

const DeliveryAddressNickName = styled(DeliveryAddressFormInput)``;

const Address = styled(DeliveryAddressFormInput)`
  width: 500px;
`;

const RecipientName = styled(DeliveryAddressFormInput)``;

const RecipientPhoneNumber = styled(DeliveryAddressFormInput)``;

const DetailInfo = styled.span`
  font-size: ${(props) => props.theme.fontSize.tiny};
`;

type Props = {
  deliveryAddress?: DeliveryAddress;
};

const DeliveryAddressForm = (props: Props, ref: Ref<DeliveryAddressFormRef>): JSX.Element => {
  const { deliveryAddress } = props;

  const nameRef = useRef<HTMLInputElement>(null);
  const recipientNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const recipientPhoneNumberRef = useRef<HTMLInputElement>(null);

  const findRef = (formInput: FormInputs) => {
    switch (formInput) {
      case 'name':
        return nameRef;

      case 'recipientName':
        return recipientNameRef;

      case 'address':
        return addressRef;

      case 'recipientPhoneNumber':
        return recipientPhoneNumberRef;
    }
  };

  const onInputClick = (formInput: FormInputs) => () => {
    const formRef = findRef(formInput);
    if (isNotNone(formRef.current)) {
      formRef.current?.classList.remove('warning');
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      getValue(formInput: FormInputs) {
        return findRef(formInput).current?.value ?? '';
      },
      setValue(formInput: FormInputs, value: string) {
        const formRef = findRef(formInput);
        if (isNotNone(formRef.current)) {
          formRef.current.value = value;
        }
      },
      onValidationFailed(formInput: FormInputs) {
        const formRef = findRef(formInput);
        formRef.current?.classList.add('warning');
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
        onClick={onInputClick('name')}
      />
      <Row>
        <Address
          ref={addressRef}
          defaultValue={deliveryAddress?.address}
          onClick={onInputClick('address')}
          placeholder="배송지"
        />
      </Row>

      <Row>
        <RecipientName
          ref={recipientNameRef}
          onClick={onInputClick('recipientName')}
          defaultValue={deliveryAddress?.recipientName}
          placeholder="수령인"
        />
        <RecipientPhoneNumber
          ref={recipientPhoneNumberRef}
          defaultValue={deliveryAddress?.recipientPhoneNumber}
          onClick={onInputClick('recipientPhoneNumber')}
          placeholder="수령인 전화번호"
        />
        <DetailInfo>전화번호는 (-) 를 사용하여 입력해주세요</DetailInfo>
      </Row>
    </Container>
  );
};

export default forwardRef<DeliveryAddressFormRef, Props>(DeliveryAddressForm);

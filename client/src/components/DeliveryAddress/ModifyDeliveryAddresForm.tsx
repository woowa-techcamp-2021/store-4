import React, { forwardRef, MouseEventHandler, Ref, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import { ModifyFormRef } from '../../containers/DeliveryAddressItemContainer';
import DeliveryAddress from '../../models/delivery-address';
import { isNotNone } from '../../utils/typeGuard';

const Container = styled.div`
  width: 100%;
  height: 150px;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModifyFormInput = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.color.grey1};
  padding: 5px 8px;
  outline: none;
  color: ${(props) => props.theme.color.grey5};
`;

const ModifyFormWrapper = styled.div``;

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  gap: 8px;
`;

const DeliveryAddressNickName = styled(ModifyFormInput)`
  font-size: ${(props) => props.theme.fontSize.medium};
  font-weight: bold;
`;

const Address = styled(ModifyFormInput)`
  width: 500px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const ModifyFormButton = styled.button`
  width: 80px;
  height: 30px;
  outline: none;
  font-size: ${(props) => props.theme.fontSize.small};
  cursor: pointer;
`;

const CancelButton = styled(ModifyFormButton)`
  border: 1px solid ${(props) => props.theme.color.grey3};
  background-color: ${(props) => props.theme.color.white1};
  color: ${(props) => props.theme.color.grey5};
`;

const SaveButton = styled(ModifyFormButton)`
  border: none;
  background-color: ${(props) => props.theme.color.black};
  color: ${(props) => props.theme.color.white1};
`;

const RecipientName = styled(ModifyFormInput)``;

const RecipientPhoneNumber = styled(ModifyFormInput)``;

type Props = {
  deliveryAddress: DeliveryAddress;
  onCancelModifyClick: MouseEventHandler;
};

const ModifyDeliveryAddressForm = (props: Props, ref: Ref<ModifyFormRef>): JSX.Element => {
  const { deliveryAddress, onCancelModifyClick } = props;
  const { name, recipientName, address, recipientPhoneNumber } = deliveryAddress;

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
        if (isNotNone(nameRef.current)) {
          nameRef.current.value = value;
        }
      },
      set address(value: string) {
        if (isNotNone(nameRef.current)) {
          nameRef.current.value = value;
        }
      },
      set recipientPhoneNumber(value: string) {
        if (isNotNone(nameRef.current)) {
          nameRef.current.value = value;
        }
      },
    }),
    []
  );

  return (
    <Container>
      <ModifyFormWrapper>
        <DeliveryAddressNickName ref={nameRef} defaultValue={name} />
        <RowWrapper>
          <Address ref={addressRef} defaultValue={address} />
        </RowWrapper>

        <RowWrapper>
          <RecipientName ref={recipientNameRef} defaultValue={recipientName} />
          <RecipientPhoneNumber ref={recipientPhoneNumberRef} defaultValue={recipientPhoneNumber} />
        </RowWrapper>
      </ModifyFormWrapper>

      <ButtonWrapper>
        <CancelButton onClick={onCancelModifyClick}>취소</CancelButton>
        <SaveButton>완료</SaveButton>
      </ButtonWrapper>
    </Container>
  );
};

export default forwardRef<ModifyFormRef, Props>(ModifyDeliveryAddressForm);

import React, { forwardRef, MouseEventHandler, Ref } from 'react';
import styled from 'styled-components';
import { DeliveryAddressFormRef } from '../../containers/ManageDeliveryAddressContainer';
import DeliveryAddressForm from './DeliveryAddressForm';

const Container = styled.div`
  width: 100%;
  height: 150px;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${(props) => props.theme.color.grey1};
`;

const CreateFormWrapper = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const CreateFormButton = styled.button`
  width: 80px;
  height: 30px;
  outline: none;
  font-size: ${(props) => props.theme.fontSize.small};
  cursor: pointer;
`;

const CancelButton = styled(CreateFormButton)`
  border: 1px solid ${(props) => props.theme.color.grey3};
  background-color: ${(props) => props.theme.color.white1};
  color: ${(props) => props.theme.color.grey5};
`;

const SaveButton = styled(CreateFormButton)`
  border: none;
  background-color: ${(props) => props.theme.color.black};
  color: ${(props) => props.theme.color.white1};
`;

type Props = {
  onCancelCreateClick: MouseEventHandler;
  onCreateClick: MouseEventHandler;
};

const CreateDeliveryAddressForm = (props: Props, ref: Ref<DeliveryAddressFormRef>): JSX.Element => {
  const { onCancelCreateClick, onCreateClick } = props;

  return (
    <Container data-testid="create-delivery-address-form">
      <CreateFormWrapper>
        <DeliveryAddressForm ref={ref} />
      </CreateFormWrapper>

      <ButtonWrapper>
        <CancelButton onClick={onCancelCreateClick}>취소</CancelButton>
        <SaveButton onClick={onCreateClick}>완료</SaveButton>
      </ButtonWrapper>
    </Container>
  );
};

export default forwardRef<DeliveryAddressFormRef, Props>(CreateDeliveryAddressForm);

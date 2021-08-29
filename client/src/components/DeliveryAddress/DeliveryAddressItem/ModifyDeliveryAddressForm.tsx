import React, { forwardRef, MouseEventHandler, Ref } from 'react';
import styled from 'styled-components';
import { DeliveryAddressFormRef } from '../../../containers/ManageDeliveryAddressContainer';
import DeliveryAddress from '../../../models/delivery-address';
import DeliveryAddressForm from '../DeliveryAddressForm';

const Container = styled.div`
  width: 100%;
  height: 150px;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid ${(props) => props.theme.color.grey1};

  &:last-child {
    border-bottom: none;
  }
`;

const ModifyFormWrapper = styled.div``;

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

type Props = {
  deliveryAddress: DeliveryAddress;
  onModifyClick: MouseEventHandler;
  onCancelModifyClick: MouseEventHandler;
};

const ModifyDeliveryAddressForm = (props: Props, ref: Ref<DeliveryAddressFormRef>): JSX.Element => {
  const { deliveryAddress, onCancelModifyClick, onModifyClick } = props;

  return (
    <Container>
      <ModifyFormWrapper>
        <DeliveryAddressForm ref={ref} deliveryAddress={deliveryAddress} />
      </ModifyFormWrapper>

      <ButtonWrapper>
        <CancelButton onClick={onCancelModifyClick} data-testid="delivery-address-cancel-modify">
          취소
        </CancelButton>
        <SaveButton onClick={onModifyClick} data-testid="delivery-address-modify">
          완료
        </SaveButton>
      </ButtonWrapper>
    </Container>
  );
};

export default forwardRef<DeliveryAddressFormRef, Props>(ModifyDeliveryAddressForm);

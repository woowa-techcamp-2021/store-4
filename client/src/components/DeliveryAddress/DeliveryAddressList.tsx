import React, { forwardRef, MouseEventHandler, Ref } from 'react';
import styled from 'styled-components';
import DeliveryAddress from '../../models/delivery-address';
import DeliveryAddressItemContainer from '../../containers/DeliveryAddressItemContainer';
import CreateDeliveryAddressForm from './CreateDeliveryAddressForm';
import { DeliveryAddressFormRef } from '../../containers/ManageDeliveryAddressContainer';

const Container = styled.div``;

const CreateDeliveryAddress = styled.div`
  border: 1px dashed ${(props) => props.theme.color.grey3};
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

type Props = {
  isCreating: boolean;
  deliveryAddresses: DeliveryAddress[];
  onCreatingClick: MouseEventHandler;
  onCancelCreatingClick: MouseEventHandler;
};

const DeliveryAddressList = (props: Props, ref: Ref<DeliveryAddressFormRef>): JSX.Element => {
  const { deliveryAddresses, isCreating, onCreatingClick, onCancelCreatingClick } = props;

  const DeliveryAddressItems = deliveryAddresses.map((deliveryAddress) => (
    <DeliveryAddressItemContainer key={deliveryAddress.id} deliveryAddress={deliveryAddress} />
  ));

  return (
    <Container>
      {DeliveryAddressItems}
      {isCreating ? (
        <CreateDeliveryAddressForm ref={ref} onCancelCreateClick={onCancelCreatingClick} />
      ) : (
        <CreateDeliveryAddress
          onClick={onCreatingClick}
          data-testid="enable-create-delivery-address-button"
        >
          +
        </CreateDeliveryAddress>
      )}
    </Container>
  );
};

export default forwardRef<DeliveryAddressFormRef, Props>(DeliveryAddressList);

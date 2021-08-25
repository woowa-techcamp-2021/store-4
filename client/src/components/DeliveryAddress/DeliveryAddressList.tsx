import React, { forwardRef, MouseEventHandler, Ref } from 'react';
import styled from 'styled-components';
import DeliveryAddressItemContainer from '../../containers/DeliveryAddressItemContainer';
import CreateDeliveryAddressForm from './CreateDeliveryAddressForm';
import { DeliveryAddressFormRef } from '../../containers/ManageDeliveryAddressContainer';
import deliveryAddressStore from '../../stores/deliveryAddressStore';
import { observer } from 'mobx-react';

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
  onCreatingClick: MouseEventHandler;
  onCreateClick: MouseEventHandler;
  onCancelCreatingClick: MouseEventHandler;
};

const DeliveryAddressList = (props: Props, ref: Ref<DeliveryAddressFormRef>): JSX.Element => {
  const { isCreating, onCreatingClick, onCreateClick, onCancelCreatingClick } = props;
  const { deliveryAddresses } = deliveryAddressStore;

  const DeliveryAddressItems = deliveryAddresses.map((deliveryAddress) => (
    <DeliveryAddressItemContainer key={deliveryAddress.id} deliveryAddress={deliveryAddress} />
  ));

  return (
    <Container>
      {DeliveryAddressItems}
      {isCreating ? (
        <CreateDeliveryAddressForm
          ref={ref}
          onCreateClick={onCreateClick}
          onCancelCreateClick={onCancelCreatingClick}
        />
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

export default observer(forwardRef<DeliveryAddressFormRef, Props>(DeliveryAddressList));

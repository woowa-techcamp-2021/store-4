import React, { forwardRef, MouseEventHandler, Ref } from 'react';
import styled from 'styled-components';
import DeliveryAddressItemContainer from '../../containers/DeliveryAddressItemContainer';
import CreateDeliveryAddressForm from './CreateDeliveryAddressForm';
import { DeliveryAddressFormRef } from '../../containers/ManageDeliveryAddressContainer';
import deliveryAddressStore from '../../stores/deliveryAddressStore';
import { observer } from 'mobx-react';
import { RiAddBoxFill } from 'react-icons/ri';
import theme from '../../styles/theme';

const Container = styled.div``;

const CreateDeliveryAddress = styled.div`
  border: 1px dashed ${(props) => props.theme.color.grey3};
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => props.theme.color.grey3};
  font-size: ${(props) => props.theme.fontSize.large};
`;

const CreateDeliveryAddressText = styled.span`
  font-size: ${(props) => props.theme.fontSize.normal};
  margin-left: 5px;
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
          <RiAddBoxFill />
          <CreateDeliveryAddressText>배송지 추가하기</CreateDeliveryAddressText>
        </CreateDeliveryAddress>
      )}
    </Container>
  );
};

export default observer(forwardRef<DeliveryAddressFormRef, Props>(DeliveryAddressList));

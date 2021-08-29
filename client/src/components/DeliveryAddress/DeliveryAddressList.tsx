import React, { forwardRef, MouseEventHandler, Ref } from 'react';
import styled from 'styled-components';
import DeliveryAddressItemContainer from '../../containers/DeliveryAddressItemContainer';
import CreateDeliveryAddressForm from './CreateDeliveryAddressForm';
import { DeliveryAddressFormRef } from '../../containers/ManageDeliveryAddressContainer';
import deliveryAddressStore from '../../stores/deliveryAddressStore';
import { observer } from 'mobx-react';
import { RiAddBoxFill } from 'react-icons/ri';

const Container = styled.div`
  width: 100%;
`;

const Title = styled.div`
  width: 300px;
  font-size: ${(props) => props.theme.fontSize.medium};
  font-weight: bold;
  margin-bottom: 20px;
`;

const DeliveryAddressListWrapper = styled.div``;

const CreateDeliveryAddress = styled.div`
  border: 1px dashed ${(props) => props.theme.color.grey3};
  width: 100%;
  height: 150px;
  cursor: pointer;
  overflow: hidden;

  :hover {
    div {
      transform: scale(1.05);
    }
  }
`;

const CreateDeliveryContentWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.color.grey3};
  font-size: ${(props) => props.theme.fontSize.large};
  transition: all 0.25s;
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
      <Title>배송지 관리</Title>
      <DeliveryAddressListWrapper>{DeliveryAddressItems}</DeliveryAddressListWrapper>
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
          <CreateDeliveryContentWrapper>
            <RiAddBoxFill />
            <CreateDeliveryAddressText>배송지 추가하기</CreateDeliveryAddressText>
          </CreateDeliveryContentWrapper>
        </CreateDeliveryAddress>
      )}
    </Container>
  );
};

export default observer(forwardRef<DeliveryAddressFormRef, Props>(DeliveryAddressList));

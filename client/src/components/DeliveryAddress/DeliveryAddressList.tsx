import React from 'react';
import styled from 'styled-components';
import DeliveryAddress from '../../models/delivery-address';
import DeliveryAddressItemContainer from '../../containers/DeliveryAddressItemContainer';

const Container = styled.div``;

type Props = {
  deliveryAddresses: DeliveryAddress[];
};

const DeliveryAddressList = (props: Props): JSX.Element => {
  const { deliveryAddresses } = props;

  const DeliveryAddressItems = deliveryAddresses.map((deliveryAddress) => (
    <DeliveryAddressItemContainer key={deliveryAddress.id} deliveryAddress={deliveryAddress} />
  ));

  return <Container>{DeliveryAddressItems}</Container>;
};

export default DeliveryAddressList;

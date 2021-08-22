import React from 'react';
import styled from 'styled-components';
import DeliveryAddress from '../../models/delivery-address';

const Container = styled.div`
  width: 100%;
`;

const RowWrapper = styled.div`
  color: ${(props) => props.theme.color.grey5};
  display: flex;
  align-items: center;
  margin: 10px 0;
  gap: 8px;
`;

const DeliveryAddressNickName = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
  font-weight: bold;
`;

const Address = styled.div``;

const RecipientName = styled.div``;

const RecipientPhoneNumber = styled.div``;

type Props = {
  deliveryAddress: DeliveryAddress;
};

const DeliveryAddressItem = (props: Props): JSX.Element => {
  const { deliveryAddress } = props;
  const { name, recipientName, address, recipientPhoneNumber } = deliveryAddress;

  return (
    <Container>
      <DeliveryAddressNickName>{name}</DeliveryAddressNickName>
      <RowWrapper>
        <Address>{address}</Address>
      </RowWrapper>

      <RowWrapper>
        <RecipientName>({recipientName})</RecipientName>
        <RecipientPhoneNumber>{recipientPhoneNumber}</RecipientPhoneNumber>
      </RowWrapper>
    </Container>
  );
};

export default DeliveryAddressItem;

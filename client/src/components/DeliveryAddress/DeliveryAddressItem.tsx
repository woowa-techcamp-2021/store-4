import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import DeliveryAddress from '../../models/delivery-address';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 150px;
  padding: 0px 20px;
`;

const DeliveryAddressWrapper = styled.div``;

const RowWrapper = styled.div`
  color: ${(props) => props.theme.color.grey5};
  display: flex;
  align-items: center;
  margin: 10px 0;
  gap: 8px;
  padding: 5px 0px;
`;

const DeliveryAddressNickName = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
  font-weight: bold;
  padding: 5px 0px;
`;

const Address = styled.div``;

const RecipientName = styled.div``;

const RecipientPhoneNumber = styled.div``;

const ChangeToModifyButton = styled.button`
  border: 1px solid ${(props) => props.theme.color.grey3};
  background-color: ${(props) => props.theme.color.grey1};
  color: ${(props) => props.theme.color.grey5};
  font-size: ${(props) => props.theme.fontSize.small};
  width: 80px;
  height: 30px;
  outline: none;
  cursor: pointer;
`;

type Props = {
  deliveryAddress: DeliveryAddress;
  onToModifyClick: MouseEventHandler;
};

const DeliveryAddressItem = (props: Props): JSX.Element => {
  const { deliveryAddress, onToModifyClick } = props;
  const { name, recipientName, address, recipientPhoneNumber } = deliveryAddress;

  return (
    <Container data-testid="delivery-address-item">
      <DeliveryAddressWrapper>
        <DeliveryAddressNickName>{name}</DeliveryAddressNickName>
        <RowWrapper>
          <Address>{address}</Address>
        </RowWrapper>

        <RowWrapper>
          <RecipientName>({recipientName})</RecipientName>
          <RecipientPhoneNumber>{recipientPhoneNumber}</RecipientPhoneNumber>
        </RowWrapper>
      </DeliveryAddressWrapper>
      <ChangeToModifyButton onClick={onToModifyClick}>수정</ChangeToModifyButton>
    </Container>
  );
};

export default DeliveryAddressItem;

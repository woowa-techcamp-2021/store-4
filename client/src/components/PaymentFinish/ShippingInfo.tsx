import React from 'react';
import OrderFormSender from '../OrderPayment/OrderForm/OrderFormSender';
import styled from 'styled-components';
import OrderFormRecipient from './OrderFormRecipient';
import { useHistory } from '../../lib/router';
import optionStore from '../../stores/optionStore';
import buildQueryString from '../../utils/build-query-string';
import User from '../../models/user';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Information = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  margin: 40px auto;
`;

const GoToProducts = styled.button`
  color: ${(props) => props.theme.color.white1};
  width: 280px;
  height: 60px;
  background-color: ${(props) => props.theme.color.mint2};
  border: none;
  border-radius: 4px;
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.color.mint3};
  }
`;

type Props = {
  user: User;
  recipientName: string;
  address: string;
};

const ShippingInfo = (props: Props): JSX.Element => {
  const { user, recipientName, address } = props;
  const history = useHistory();
  const options = optionStore.option;

  const handleGoToProducts = () => {
    const query = buildQueryString(options);
    history.push(`/products${query}`);
  };

  return (
    <Container>
      <Information>
        <OrderFormSender username={user.name} email={user.email} />
        <OrderFormRecipient recipientName={recipientName} address={address} />
      </Information>
      <ButtonWrapper>
        <GoToProducts onClick={handleGoToProducts}>쇼핑 계속하기</GoToProducts>
      </ButtonWrapper>
    </Container>
  );
};

export default ShippingInfo;

import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import User from '../../models/user';
import orderStore from '../../stores/orderStore';
import FinishedTotalPrice from './FinishedTotalPrice';
import ShippingInfo from './ShippingInfo';

const Container = styled.div`
  width: ${(props) => props.theme.device.desktop};
  margin: 0 auto;
`;

type Props = {
  user: User;
  recipientName: string;
  address: string;
};

const PaymentFinish = (props: Props): JSX.Element => {
  const { user, recipientName, address } = props;

  useEffect(() => {
    return () => {
      orderStore.clearOrder();
    };
  }, []);

  return (
    <Container>
      <FinishedTotalPrice />
      <ShippingInfo user={user} recipientName={recipientName} address={address} />
    </Container>
  );
};

export default observer(PaymentFinish);

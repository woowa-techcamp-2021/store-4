import React from 'react';
import styled from 'styled-components';
import OrderHeader from '../OrderPayment/OrderHeader';
import OrderTable from '../OrderPayment/OrderTable/OrderTable';
import FinishedTotalPrice from './FinishedTotalPrice';

const Container = styled.div`
  width: ${(props) => props.theme.device.desktop};
  margin: 0 auto;
`;

const PaymentFinish = (): JSX.Element => {
  return (
    <Container>
      <OrderHeader currentStep={3} />
      <OrderTable />
      <FinishedTotalPrice />
    </Container>
  );
};

export default PaymentFinish;

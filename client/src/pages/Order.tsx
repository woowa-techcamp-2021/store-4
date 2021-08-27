import React from 'react';
import OrderPaymentContainer from '../containers/OrderPaymentContainer';
import withAuthentication from '../hoc/withAuthentication';

const OrderPage = (): JSX.Element => {
  return <OrderPaymentContainer />;
};

export default withAuthentication(OrderPage, 'order');

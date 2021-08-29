import React from 'react';
import OrderPaymentContainer from '../containers/OrderPaymentContainer';
import withAuthentication from '../hoc/withAuthentication';

const OrderPaymentPage = (): JSX.Element => {
  return <OrderPaymentContainer />;
};

export default withAuthentication(OrderPaymentPage);

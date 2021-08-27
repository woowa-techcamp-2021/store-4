import React, { useState, useEffect } from 'react';
import AccountOrder from '../components/Account/AccountOrder/AccountOrder';
import orderStore from '../stores/orderStore';

const AccountOrderContainer = (): JSX.Element => {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => {
    orderStore.fetchOrders().then((data: any[]) => setOrders(data));
  }, []);
  return <AccountOrder orders={orders} />;
};

export default AccountOrderContainer;

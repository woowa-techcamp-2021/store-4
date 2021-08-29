import React, { useState, useEffect } from 'react';
import AccountOrder from '../components/Account/AccountOrder/AccountOrder';
import Order from '../models/order';
import orderStore from '../stores/orderStore';

const AccountOrderContainer = (): JSX.Element => {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    orderStore.fetchOrders().then((data: Order[]) => setOrders(data));
  }, []);
  return <AccountOrder orders={orders} />;
};

export default AccountOrderContainer;

import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import DeliveryAddressList from '../components/DeliveryAddress/DeliveryAddressList';
import DeliveryAddress from '../models/delivery-address';

export type DeliveryAddressFormRef = {
  readonly name: string;
  readonly recipientName: string;
  readonly address: string;
  readonly recipientPhoneNumber: string;
};

const useDeliveryAddresses = (): DeliveryAddress[] => {
  const [deliveryAddresses, setDeliveryAddresses] = useState<DeliveryAddress[]>([]);

  useEffect(() => {
    setDeliveryAddresses([
      {
        id: 1,
        name: '본가',
        recipientName: '최진우',
        address: '대구 수성구',
        recipientPhoneNumber: '010-1234-1234',
      },
      {
        id: 2,
        name: '자취방',
        recipientName: '최진우',
        address: '서울시 마포구',
        recipientPhoneNumber: '010-1234-1234',
      },
    ]);
  }, []);

  return deliveryAddresses;
};

const ManageDeliveryAddressContainer = (): JSX.Element => {
  const deliveryAddresses = useDeliveryAddresses();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreatingClick = useCallback(() => {
    setIsCreating(true);
  }, []);

  const handleCancelCreatingClick = useCallback(() => {
    setIsCreating(false);
  }, []);

  return (
    <DeliveryAddressList
      isCreating={isCreating}
      onCreatingClick={handleCreatingClick}
      onCancelCreatingClick={handleCancelCreatingClick}
      deliveryAddresses={deliveryAddresses}
    />
  );
};

export default ManageDeliveryAddressContainer;

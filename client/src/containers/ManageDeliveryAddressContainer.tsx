import { observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import DeliveryAddressList from '../components/DeliveryAddress/DeliveryAddressList';
import { useHistory } from '../lib/router';
import deliveryAddressStore from '../stores/deliveryAddressStore';

export type DeliveryAddressFormRef = {
  readonly name: string;
  readonly recipientName: string;
  readonly address: string;
  readonly recipientPhoneNumber: string;
};

const ManageDeliveryAddressContainer = (): JSX.Element => {
  const [isCreating, setIsCreating] = useState(false);
  const history = useHistory();

  const handleCreatingClick = useCallback(() => {
    setIsCreating(true);
  }, []);

  const handleCancelCreatingClick = useCallback(() => {
    setIsCreating(false);
  }, []);

  useEffect(() => {
    deliveryAddressStore.fetchDeliveryAddresses().catch(() => {
      history.push('/error');
    });
  }, [history]);

  return (
    <DeliveryAddressList
      isCreating={isCreating}
      onCreatingClick={handleCreatingClick}
      onCancelCreatingClick={handleCancelCreatingClick}
    />
  );
};

export default observer(ManageDeliveryAddressContainer);

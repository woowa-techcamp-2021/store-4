import { observer } from 'mobx-react';
import React, { createRef, useCallback, useRef } from 'react';
import { useEffect, useState } from 'react';
import DeliveryAddressList from '../components/DeliveryAddress/DeliveryAddressList';
import { useHistory } from '../lib/router';
import deliveryAddressStore from '../stores/deliveryAddressStore';
import { isNotNone } from '../utils/typeGuard';

export type DeliveryAddressFormRef = {
  readonly name: string;
  readonly recipientName: string;
  readonly address: string;
  readonly recipientPhoneNumber: string;
};

const ManageDeliveryAddressContainer = (): JSX.Element => {
  const [isCreating, setIsCreating] = useState(false);
  const history = useHistory();
  const createFormRef = useRef<DeliveryAddressFormRef>(null);

  const handleCreatingClick = useCallback(() => {
    setIsCreating(true);
  }, []);

  const handleCancelCreatingClick = useCallback(() => {
    setIsCreating(false);
  }, []);

  const handleCreateClick = useCallback(() => {
    if (isNotNone(createFormRef.current)) {
      const { address, name, recipientName, recipientPhoneNumber } = createFormRef.current;
      deliveryAddressStore.createDeliveryAddress({
        address,
        name,
        recipientName,
        recipientPhoneNumber,
      });
      setIsCreating(false);
    }
  }, []);

  useEffect(() => {
    deliveryAddressStore.fetchDeliveryAddresses().catch(() => {
      history.push('/error');
    });
  }, [history]);

  return (
    <DeliveryAddressList
      ref={createFormRef}
      onCreateClick={handleCreateClick}
      isCreating={isCreating}
      onCreatingClick={handleCreatingClick}
      onCancelCreatingClick={handleCancelCreatingClick}
    />
  );
};

export default observer(ManageDeliveryAddressContainer);

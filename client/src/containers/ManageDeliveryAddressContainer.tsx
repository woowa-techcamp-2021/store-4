import { observer } from 'mobx-react';
import React, { useCallback, useContext, useRef } from 'react';
import { useEffect, useState } from 'react';
import { AuthenticationContext } from '../components/Authentication/Authentication';
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
  const { onErrorOccurred } = useContext(AuthenticationContext);

  const handleCreatingClick = useCallback(() => {
    setIsCreating(true);
  }, []);

  const handleCancelCreatingClick = useCallback(() => {
    setIsCreating(false);
  }, []);

  const handleCreateClick = useCallback(() => {
    if (isNotNone(createFormRef.current)) {
      const { address, name, recipientName, recipientPhoneNumber } = createFormRef.current;
      deliveryAddressStore
        .createDeliveryAddress({
          address,
          name,
          recipientName,
          recipientPhoneNumber,
        })
        .then(() => {
          setIsCreating(false);
        })
        .catch((error) => {
          switch (error.status) {
            case 401:
            case 410:
              onErrorOccurred();
              return;

            case 400:
              alert('양식을 확인해주세요');
              return;

            default:
              history.push('/error');
              return;
          }
        });
    }
  }, [history, onErrorOccurred]);

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

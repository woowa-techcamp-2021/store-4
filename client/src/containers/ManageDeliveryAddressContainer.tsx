import { observer } from 'mobx-react';
import React, { useCallback, useContext, useRef } from 'react';
import { useEffect, useState } from 'react';
import { AuthenticationContext } from '../components/Authentication/Authentication';
import DeliveryAddressList from '../components/DeliveryAddress/DeliveryAddressList';
import { useHistory } from '../lib/router';
import deliveryAddressStore from '../stores/deliveryAddressStore';
import { isNotNone } from '../utils/typeGuard';
import { isBlank, isPhoneNumber } from '../utils/validation';

export type FormInputs = 'name' | 'recipientName' | 'address' | 'recipientPhoneNumber';

export type DeliveryAddressFormRef = {
  getValue: (formInputs: FormInputs) => string;
  setValue: (formInputs: FormInputs, value: string) => void;
  onValidationFailed: (formInput: FormInputs) => void;
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
      const { getValue, onValidationFailed } = createFormRef.current;
      let isValidated = true;

      const name = getValue('name');
      if (isBlank(name)) {
        onValidationFailed('name');
        isValidated = false;
      }

      const address = getValue('address');
      if (isBlank(address)) {
        onValidationFailed('address');
        isValidated = false;
      }

      const recipientName = getValue('recipientName');
      if (isBlank(recipientName)) {
        onValidationFailed('recipientName');
        isValidated = false;
      }

      const recipientPhoneNumber = getValue('recipientPhoneNumber');
      if (!isPhoneNumber(recipientPhoneNumber)) {
        onValidationFailed('recipientPhoneNumber');
        isValidated = false;
      }

      if (!isValidated) {
        return;
      }

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

import React, { useCallback, useReducer, useRef } from 'react';
import DeliveryAddressItem from '../components/DeliveryAddress/DeliveryAddressItem/DeliveryAddressItem';
import ModifyDeliveryAddressForm from '../components/DeliveryAddress/DeliveryAddressItem/ModifyDeliveryAddressForm';
import confirmModal from '../lib/confirmModal';
import { useHistory } from '../lib/router';
import toast from '../lib/toast';
import DeliveryAddress from '../models/delivery-address';
import deliveryAddressStore from '../stores/deliveryAddressStore';
import userStore from '../stores/userStore';
import { isNotNone } from '../utils/typeGuard';
import { isBlank, isPhoneNumber } from '../utils/validation';
import { DeliveryAddressFormRef } from './ManageDeliveryAddressContainer';

type Props = {
  deliveryAddress: DeliveryAddress;
};

enum Modes {
  Read,
  Modify,
}

type ModeActions = {
  type: 'READ_MODE' | 'MODIFY_MODE';
};

const modeReducer = (state: Modes, action: ModeActions) => {
  switch (action.type) {
    case 'READ_MODE':
      return Modes.Read;

    case 'MODIFY_MODE':
      return Modes.Modify;

    default:
      return state;
  }
};

const DeliveryAddressItemContainer = (props: Props): JSX.Element => {
  const [mode, dispatchMode] = useReducer(modeReducer, Modes.Read);
  const modifyFormRef = useRef<DeliveryAddressFormRef & HTMLFormElement>(null);
  const history = useHistory();

  const handleCancelModifying = () => {
    dispatchMode({
      type: 'READ_MODE',
    });
  };

  const handleToModifyButtonClick = () => {
    dispatchMode({
      type: 'MODIFY_MODE',
    });
  };

  const handleDelete = useCallback(() => {
    deliveryAddressStore.deleteDeliveryAddress(props.deliveryAddress.id).catch(() => {
      history.push('/error');
    });
  }, [history, props.deliveryAddress.id]);

  const handleDeleteClick = useCallback(() => {
    confirmModal.show('배송지 삭제', '배송지가 영구적으로 삭제됩니다.', handleDelete);
  }, [handleDelete]);

  const handleModifyClick = useCallback(() => {
    if (isNotNone(modifyFormRef.current)) {
      const { getValue, onValidationFailed } = modifyFormRef.current;
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
        .modifyDeliveryAddress(props.deliveryAddress.id, {
          address,
          name,
          recipientName,
          recipientPhoneNumber,
        })
        .then(() => {
          dispatchMode({ type: 'READ_MODE' });
        })
        .catch((error) => {
          switch (error.status) {
            case 401:
            case 410:
              userStore.onAuthError(error.status);
              return;

            case 400:
              toast.error('양식을 확인해주세요');
              return;

            default:
              toast.error('오류가 발생했습니다');
              history.push('/error');
              return;
          }
        });
    }
  }, [history, props.deliveryAddress.id]);

  if (mode === Modes.Modify) {
    return (
      <ModifyDeliveryAddressForm
        ref={modifyFormRef}
        deliveryAddress={props.deliveryAddress}
        onModifyClick={handleModifyClick}
        onCancelModifyClick={handleCancelModifying}
      />
    );
  }

  return (
    <DeliveryAddressItem
      onDeleteClick={handleDeleteClick}
      onToModifyClick={handleToModifyButtonClick}
      deliveryAddress={props.deliveryAddress}
    />
  );
};

export default DeliveryAddressItemContainer;

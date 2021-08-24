import React, { useCallback, useReducer, useRef } from 'react';
import DeliveryAddressItem from '../components/DeliveryAddress/DeliveryAddressItem/DeliveryAddressItem';
import ModifyDeliveryAddressForm from '../components/DeliveryAddress/DeliveryAddressItem/ModifyDeliveryAddressForm';
import { useHistory } from '../lib/router';
import DeliveryAddress from '../models/delivery-address';
import deliveryAddressStore from '../stores/deliveryAddressStore';
import { isNotNone } from '../utils/typeGuard';
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

  const handleDeleteClick = useCallback(() => {
    deliveryAddressStore.deleteDeliveryAddress(props.deliveryAddress.id).catch(() => {
      history.push('/error');
    });
  }, [history, props.deliveryAddress.id]);

  const handleModifyClick = useCallback(() => {
    if (isNotNone(modifyFormRef.current)) {
      const { address, name, recipientName, recipientPhoneNumber } = modifyFormRef.current;

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
            case 400:
              alert('양식을 확인해주세요');
              return;

            default:
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

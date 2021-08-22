import React, { useReducer, useRef } from 'react';
import DeliveryAddressItem from '../components/DeliveryAddress/DeliveryAddressItem';
import ModifyDeliveryAddressForm from '../components/DeliveryAddress/ModifyDeliveryAddresForm';
import DeliveryAddress from '../models/delivery-address';
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

  if (mode === Modes.Modify) {
    return (
      <ModifyDeliveryAddressForm
        ref={modifyFormRef}
        deliveryAddress={props.deliveryAddress}
        onCancelModifyClick={handleCancelModifying}
      />
    );
  }

  return (
    <DeliveryAddressItem
      onToModifyClick={handleToModifyButtonClick}
      deliveryAddress={props.deliveryAddress}
    />
  );
};

export default DeliveryAddressItemContainer;

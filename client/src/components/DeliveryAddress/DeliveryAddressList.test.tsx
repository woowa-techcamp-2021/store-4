import React from 'react';
import { render, screen } from '@testing-library/react';
import provideTheme2Test from '../../lib/provideTheme2Test';
import DeliveryAddressList from './DeliveryAddressList';
import userEvent from '@testing-library/user-event';

const onCreatingClick = jest.fn();
const onCancelCreatingClick = jest.fn();
const onCreateClick = jest.fn();

const DEFAULT_PROPS = {
  deliveryAddresses: [
    {
      id: 1,
      name: '본가',
      recipientName: '최진우',
      address: '대구 수성구',
      recipientPhoneNumber: '010-1234-1234',
    },
  ],
  onCreatingClick,
  onCancelCreatingClick,
  onCreateClick,
};

describe('DeliveryAddressList 컴포넌트', () => {
  test('생성버튼 클릭 시 생성 UI 핸들러 호출', () => {
    render(provideTheme2Test(<DeliveryAddressList isCreating={false} {...DEFAULT_PROPS} />));

    const createDeliveryAddressButton = screen.getByTestId('enable-create-delivery-address-button');
    userEvent.click(createDeliveryAddressButton);

    expect(onCreatingClick).toBeCalledTimes(1);
  });

  test('생성 활성화 시 생성 UI 표시', () => {
    render(provideTheme2Test(<DeliveryAddressList isCreating={true} {...DEFAULT_PROPS} />));

    screen.getByTestId('create-delivery-address-form');
  });
});

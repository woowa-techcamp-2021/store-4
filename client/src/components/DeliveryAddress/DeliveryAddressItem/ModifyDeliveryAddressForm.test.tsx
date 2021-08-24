import React from 'react';
import { render, screen } from '@testing-library/react';
import provideTheme2Test from '../../../lib/provideTheme2Test';
import userEvent from '@testing-library/user-event';
import ModifyDeliveryAddressForm from './ModifyDeliveryAddressForm';

const onModifyClick = jest.fn();
const onCancelModifyClick = jest.fn();

const DEFAULT_PROPS = {
  deliveryAddress: {
    id: 1,
    name: '본가',
    recipientName: '최진우',
    address: '대구 수성구',
    recipientPhoneNumber: '010-1234-1234',
  },
  onModifyClick,
  onCancelModifyClick,
};

describe('DeliveryAddressItem 컴포넌트', () => {
  test('수정 버튼 클릭 시 onModifyClick 함수 호출', () => {
    render(provideTheme2Test(<ModifyDeliveryAddressForm {...DEFAULT_PROPS} />));

    const modifyButton = screen.getByTestId('delivery-address-modify');
    userEvent.click(modifyButton);

    expect(onModifyClick).toBeCalledTimes(1);
  });

  test('수정 취소 버튼 클릭 시 onCancelModify 함수 호출', () => {
    render(provideTheme2Test(<ModifyDeliveryAddressForm {...DEFAULT_PROPS} />));

    const cancelModifyButton = screen.getByTestId('delivery-address-cancel-modify');
    userEvent.click(cancelModifyButton);

    expect(onCancelModifyClick).toBeCalledTimes(1);
  });
});

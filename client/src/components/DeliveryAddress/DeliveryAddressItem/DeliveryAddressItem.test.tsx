import React from 'react';
import { render, screen } from '@testing-library/react';
import provideTheme2Test from '../../../lib/provideTheme2Test';
import userEvent from '@testing-library/user-event';
import DeliveryAddressItem from './DeliveryAddressItem';

const onToModifyClick = jest.fn();
const onDeleteClick = jest.fn();

const DEFAULT_PROPS = {
  deliveryAddress: {
    id: 1,
    name: '본가',
    recipientName: '최진우',
    address: '대구 수성구',
    recipientPhoneNumber: '010-1234-1234',
  },
  onDeleteClick,
  onToModifyClick,
};

describe('DeliveryAddressItem 컴포넌트', () => {
  test('수정 모드 버튼 클릭 시 toModifyClick 함수 호출', () => {
    render(provideTheme2Test(<DeliveryAddressItem {...DEFAULT_PROPS} />));

    const toModifyButton = screen.getByTestId('delivery-address-to-modify');
    userEvent.click(toModifyButton);

    expect(onToModifyClick).toBeCalledTimes(1);
  });

  test('삭제 버튼 클릭 시 onDeleteClick 함수 호출', () => {
    render(provideTheme2Test(<DeliveryAddressItem {...DEFAULT_PROPS} />));

    const deleteButton = screen.getByTestId('delivery-address-delete');
    userEvent.click(deleteButton);

    expect(onDeleteClick).toBeCalledTimes(1);
  });
});

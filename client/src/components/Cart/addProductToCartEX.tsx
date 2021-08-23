import React from 'react';
import styled from 'styled-components';

import cartStore from '../../stores/cartStore';
import TOWELIMG from '../../assets/images/towel.png';

// addProductToCart 사용 예시입니다.
const LocalStorageMock = styled.button``;

const mockItemList = [
  {
    id: 0,
    imgSrc: TOWELIMG,
    title: '업사이클링 스태드그립 세트',
    count: 1,
    price: 16900,
    isSelected: true,
  },
  {
    id: 1,
    imgSrc: TOWELIMG,
    title: '유해물질이 나오지 않는 지우개',
    count: 2,
    price: 1500,
    isSelected: true,
  },
];

const CartButtons = (): JSX.Element => {
  return (
    <LocalStorageMock
      onClick={() => {
        for (const cartItem of mockItemList) {
          cartStore.addProductToCart(
            cartItem.id,
            cartItem.title,
            cartItem.imgSrc,
            cartItem.count,
            cartItem.price
          );
        }
        console.log('목데이터 추가');
      }}
    >
      로컬 목업 추가
    </LocalStorageMock>
  );
};

export default CartButtons;

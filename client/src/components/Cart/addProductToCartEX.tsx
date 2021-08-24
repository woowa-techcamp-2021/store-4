import React from 'react';
import styled from 'styled-components';

import cartStore from '../../stores/cartStore';
import TOWELIMG from '../../assets/images/towel.png';

// addProductToCart 사용 예시입니다.
const mockItemList = [
  {
    id: 0,
    imgSrc: TOWELIMG,
    title: '업사이클링 스태드그립 세트',
    count: 1,
    price: 16900,
    isSelected: true,
    selectWithSelecteds: [
      {
        id: 1,
        name: '색상',
        productOptions: [],
        selectedOption: {
          id: 1,
          name: '화이트',
          additionalPrice: 2000,
        },
      },
    ],
  },
  {
    id: 1,
    imgSrc: TOWELIMG,
    title: '유해물질이 나오지 않는 지우개',
    count: 2,
    price: 1500,
    isSelected: true,
    selectWithSelecteds: [
      {
        id: 1,
        name: '색상',
        productOptions: [],
        selectedOption: {
          id: 2,
          name: '블랙',
          additionalPrice: 10000,
        },
      },
      {
        id: 2,
        name: '사이즈',
        productOptions: [],
        selectedOption: {
          id: 1,
          name: '라지',
          additionalPrice: 5000,
        },
      },
    ],
  },
];

const LocalStorageMock = styled.button``;

const AddToCart = (): JSX.Element => {
  return (
    <LocalStorageMock
      onClick={() => {
        for (const cartItem of mockItemList) {
          cartStore.addProductToCart(
            cartItem.id,
            cartItem.title,
            cartItem.imgSrc,
            cartItem.count,
            cartItem.price,
            cartItem.selectWithSelecteds
          );
        }
        console.log('목데이터 추가');
      }}
    >
      로컬 목업 추가
    </LocalStorageMock>
  );
};

export default AddToCart;

import TEST_IMG from '../../assets/images/towel.png';

export let mockWishItems = [
  {
    id: 0,
    title: '을지로에서 만든 은수저',
    imgSrc: TEST_IMG,
    defaultPrice: 150000,
    count: 2,
  },
  {
    id: 1,
    title: '양말',
    defaultPrice: 2000,
    imgSrc: TEST_IMG,
    count: 4,
    options: [
      {
        type: '사이즈',
        name: '라지',
        price: 500,
      },
      {
        type: '색상',
        name: '블랙',
        price: 200,
      },
    ],
  },
];

export const getWishList = () => {
  return mockWishItems;
};

export const cancelWish = (itemId: number) => {
  mockWishItems = mockWishItems.filter((mockItem) => mockItem.id !== itemId);
};

import TEST_IMG from '../../assets/images/towel.png';

export let mockWishItems = [
  {
    id: 1,
    title: '을지로에서 만든 은수저',
    imgSrc: TEST_IMG,
  },
  {
    id: 2,
    title: '양말',
    imgSrc: TEST_IMG,
  },
];

export const getWishList = () => {
  return mockWishItems;
};

export const cancelWish = (itemId: number) => {
  mockWishItems = mockWishItems.filter((mockItem) => mockItem.id !== itemId);
};

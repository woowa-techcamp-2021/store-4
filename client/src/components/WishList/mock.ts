import TEST_IMG from '../../assets/images/towel.png';
import { Wish } from '../../types/Wish';

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

export const getWishList = (): Wish[] => {
  return mockWishItems;
};

export const cancelWish = (itemId: number): void => {
  mockWishItems = mockWishItems.filter((mockItem) => mockItem.id !== itemId);
};

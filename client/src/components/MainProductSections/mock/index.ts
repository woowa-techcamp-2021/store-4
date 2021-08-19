import Science from './hyoja_pc.png';
import FakeSet from './pc_kkfakeset.png';
import { ProductItemType } from '../../../types/product';

export type MockProductItemType = ProductItemType & { discountRate: number };
export type MockProductAdItemType = { id: number; title: string; subTitle: string; imgSrc: string };

const adMockData = [
  { id: 1, title: '효자손은 과학이다', subTitle: '시원하게 긁어드려요', imgSrc: Science },
  { id: 2, title: '꼭꼭 숨어라', subTitle: 'ㅋㅋ안 보이는 양말세트', imgSrc: FakeSet },
];

export const getAdProductList = (): Promise<MockProductAdItemType[]> => {
  return Promise.resolve(adMockData);
};

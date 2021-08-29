import SCIENCE from './hyoja_pc.png';
import FAKESET from './pc_kkfakeset.png';
import { ProductItemType } from '../../../types/product';

export type MockProductItemType = ProductItemType & { discountRate: number };
export type MockProductAdItemType = { id: number; title: string; subTitle: string; imgSrc: string };

const adMockData = [
  { id: 150, title: '효자손은 과학이다', subTitle: '시원하게 긁어드려요', imgSrc: SCIENCE },
  { id: 96, title: '꼭꼭 숨어라', subTitle: 'ㅋㅋ안 보이는 양말세트', imgSrc: FAKESET },
];

export const getAdProductList = (): Promise<MockProductAdItemType[]> => {
  return Promise.resolve(adMockData);
};

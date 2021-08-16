import MockImg from '../../../assets/images/towel.png';
import Science from './hyoja_pc.png';
import FakeSet from './pc_kkfakeset.png';
import { ProductItemType } from '../../../types/product';

export type MockProductItemType = ProductItemType & { discountRate: number };
export type MockProductAdItemType = { id: number; title: string; subTitle: string; imgSrc: string };

const mockProductList: MockProductItemType[] = [
  {
    id: 1,
    name: '컴퓨터싸인펜. 오늘이 전설이 될 것이다',
    price: 2000,
    point: 5,
    uploadDate: '2018-02-08',
    imgSrc: MockImg,
    discountRate: 1,
  },
  {
    id: 2,
    name: '잘나가요 세트',
    price: 15000,
    point: 4.87,
    uploadDate: '2018-02-09',
    imgSrc: MockImg,
    discountRate: 2,
  },
  {
    id: 3,
    name: '일기장. 쓰고 자자',
    price: 3000,
    point: 2,
    uploadDate: '2018-01-09',
    imgSrc: MockImg,
    discountRate: 3,
  },
  {
    id: 4,
    name: '떡볶이 테이스팅 노트. 먹고쓰자',
    price: 3500,
    point: 0,
    uploadDate: '2021-06-10',
    imgSrc: MockImg,
    discountRate: 5,
  },
  {
    id: 5,
    name: '종이로 만든 박스테이프. 두근두근',
    price: 4500,
    point: 4,
    uploadDate: '2021-04-17',
    imgSrc: MockImg,
    discountRate: 4,
  },
  {
    id: 6,
    name: '다 때가 있다',
    price: 500,
    point: 0,
    uploadDate: '2021-01-19',
    imgSrc: MockImg,
    discountRate: 8,
  },
  {
    id: 7,
    name: '포스터. 왕배달이',
    price: 2000,
    point: 1,
    uploadDate: '2020-05-23',
    imgSrc: MockImg,
    discountRate: 7,
  },
  {
    id: 8,
    name: '포스터. 봉다리배달이',
    price: 2000,
    point: 0,
    uploadDate: '2020-06-23',
    imgSrc: MockImg,
    discountRate: 9,
  },
  {
    id: 9,
    name: '포스터. 메이배달이',
    price: 2000,
    point: 4,
    uploadDate: '2020-04-23',
    imgSrc: MockImg,
    discountRate: 3,
  },
  {
    id: 10,
    name: '포스터. 냥이배달이',
    price: 2000,
    point: 4.8,
    uploadDate: '2021-06-23',
    imgSrc: MockImg,
    discountRate: 6,
  },
  {
    id: 11,
    name: '포스터. 독고배달이',
    price: 2000,
    point: 5,
    uploadDate: '2020-01-10',
    imgSrc: MockImg,
    discountRate: 5,
  },
  {
    id: 12,
    name: '포스터. 왕배달이',
    price: 2000,
    point: 3,
    uploadDate: '2020-10-23',
    imgSrc: MockImg,
    discountRate: 4,
  },
  {
    id: 13,
    name: '컴퓨터싸인펜. 오늘이 전설이 될 것이다',
    price: 2000,
    point: 2,
    uploadDate: '2018-02-08',
    imgSrc: MockImg,
    discountRate: 1,
  },
  {
    id: 14,
    name: '잘나가요 세트',
    price: 15000,
    point: 4,
    uploadDate: '2018-02-09',
    imgSrc: MockImg,
    discountRate: 8,
  },
  {
    id: 15,
    name: '일기장. 쓰고 자자',
    price: 3000,
    point: 5,
    uploadDate: '2018-01-09',
    imgSrc: MockImg,
    discountRate: 9,
  },
  {
    id: 16,
    name: '떡볶이 테이스팅 노트. 먹고쓰자',
    price: 3500,
    point: 5,
    uploadDate: '2021-06-10',
    imgSrc: MockImg,
    discountRate: 2,
  },
  {
    id: 17,
    name: '종이로 만든 박스테이프. 두근두근',
    price: 4500,
    point: 2.5,
    uploadDate: '2021-04-17',
    imgSrc: MockImg,
    discountRate: 3,
  },
  {
    id: 18,
    name: '다 때가 있다',
    price: 500,
    point: 2.5,
    uploadDate: '2021-01-19',
    imgSrc: MockImg,
    discountRate: 4,
  },
  {
    id: 19,
    name: '포스터. 메이배달이',
    price: 2000,
    point: 2.4,
    uploadDate: '2020-04-23',
    imgSrc: MockImg,
    discountRate: 6,
  },
  {
    id: 20,
    name: '포스터. 냥이배달이',
    price: 2000,
    point: 2.5,
    uploadDate: '2021-06-23',
    imgSrc: MockImg,
    discountRate: 7,
  },
  {
    id: 21,
    name: '포스터. 독고배달이',
    price: 2000,
    point: 4.2,
    uploadDate: '2020-01-10',
    imgSrc: MockImg,
    discountRate: 8,
  },
  {
    id: 22,
    name: '포스터. 왕배달이',
    price: 2000,
    point: 4.2,
    uploadDate: '2020-10-23',
    imgSrc: MockImg,
    discountRate: 2,
  },
  {
    id: 23,
    name: '컴퓨터싸인펜. 오늘이 전설이 될 것이다',
    price: 2000,
    point: 4.1,
    uploadDate: '2018-02-08',
    imgSrc: MockImg,
    discountRate: 9,
  },
  {
    id: 24,
    name: '잘나가요 세트',
    price: 15000,
    point: 3.2,
    uploadDate: '2018-02-09',
    imgSrc: MockImg,
    discountRate: 4,
  },
];

const adMockData = [
  { id: 1, title: '효자손은 과학이다', subTitle: '시원하게 긁어드려요', imgSrc: Science },
  { id: 2, title: '꼭꼭 숨어라', subTitle: 'ㅋㅋ안 보이는 양말세트', imgSrc: FakeSet },
];

export const getProductList = (): Promise<MockProductItemType[]> => {
  return Promise.resolve(mockProductList);
};

export const getAdProductList = (): Promise<MockProductAdItemType[]> => {
  return Promise.resolve(adMockData);
};
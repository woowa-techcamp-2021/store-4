import MockImg from '../../assets/images/towel.png';
import { ProductItemType, Order } from '../../types/product';

const mockProductList: Array<ProductItemType> = [
  {
    id: 0,
    name: '컴퓨터싸인펜. 오늘이 전설이 될 것이다',
    price: 2000,
    point: 5,
    uploadDate: '2018-02-08',
    imgSrc: MockImg,
  },
  {
    id: 1,
    name: '잘나가요 세트',
    price: 15000,
    point: 4.87,
    uploadDate: '2018-02-09',
    imgSrc: MockImg,
  },
  {
    id: 2,
    name: '일기장. 쓰고 자자',
    price: 3000,
    point: 2,
    uploadDate: '2018-01-09',
    imgSrc: MockImg,
  },
  {
    id: 3,
    name: '떡볶이 테이스팅 노트. 먹고쓰자',
    price: 3500,
    point: 0,
    uploadDate: '2021-06-10',
    imgSrc: MockImg,
  },
  {
    id: 4,
    name: '종이로 만든 박스테이프. 두근두근',
    price: 4500,
    point: 4,
    uploadDate: '2021-04-17',
    imgSrc: MockImg,
  },
  {
    id: 5,
    name: '다 때가 있다',
    price: 500,
    point: 0,
    uploadDate: '2021-01-19',
    imgSrc: MockImg,
  },
  {
    id: 6,
    name: '포스터. 왕배달이',
    price: 2000,
    point: 1,
    uploadDate: '2020-05-23',
    imgSrc: MockImg,
  },
  {
    id: 7,
    name: '포스터. 봉다리배달이',
    price: 2000,
    point: 0,
    uploadDate: '2020-06-23',
    imgSrc: MockImg,
  },
  {
    id: 8,
    name: '포스터. 메이배달이',
    price: 2000,
    point: 4,
    uploadDate: '2020-04-23',
    imgSrc: MockImg,
  },
  {
    id: 9,
    name: '포스터. 냥이배달이',
    price: 2000,
    point: 4.8,
    uploadDate: '2021-06-23',
    imgSrc: MockImg,
  },
  {
    id: 10,
    name: '포스터. 독고배달이',
    price: 2000,
    point: 5,
    uploadDate: '2020-01-10',
    imgSrc: MockImg,
  },
  {
    id: 11,
    name: '포스터. 왕배달이',
    price: 2000,
    point: 3,
    uploadDate: '2020-10-23',
    imgSrc: MockImg,
  },
  {
    id: 12,
    name: '컴퓨터싸인펜. 오늘이 전설이 될 것이다',
    price: 2000,
    point: 2,
    uploadDate: '2018-02-08',
    imgSrc: MockImg,
  },
  {
    id: 13,
    name: '잘나가요 세트',
    price: 15000,
    point: 4,
    uploadDate: '2018-02-09',
    imgSrc: MockImg,
  },
  {
    id: 14,
    name: '일기장. 쓰고 자자',
    price: 3000,
    point: 5,
    uploadDate: '2018-01-09',
    imgSrc: MockImg,
  },
  {
    id: 15,
    name: '떡볶이 테이스팅 노트. 먹고쓰자',
    price: 3500,
    point: 5,
    uploadDate: '2021-06-10',
    imgSrc: MockImg,
  },
  {
    id: 16,
    name: '종이로 만든 박스테이프. 두근두근',
    price: 4500,
    point: 2.5,
    uploadDate: '2021-04-17',
    imgSrc: MockImg,
  },
  {
    id: 17,
    name: '다 때가 있다',
    price: 500,
    point: 2.5,
    uploadDate: '2021-01-19',
    imgSrc: MockImg,
  },
  {
    id: 18,
    name: '포스터. 메이배달이',
    price: 2000,
    point: 2.4,
    uploadDate: '2020-04-23',
    imgSrc: MockImg,
  },
  {
    id: 19,
    name: '포스터. 냥이배달이',
    price: 2000,
    point: 2.5,
    uploadDate: '2021-06-23',
    imgSrc: MockImg,
  },
  {
    id: 20,
    name: '포스터. 독고배달이',
    price: 2000,
    point: 4.2,
    uploadDate: '2020-01-10',
    imgSrc: MockImg,
  },
  {
    id: 21,
    name: '포스터. 왕배달이',
    price: 2000,
    point: 4.2,
    uploadDate: '2020-10-23',
    imgSrc: MockImg,
  },
  {
    id: 22,
    name: '컴퓨터싸인펜. 오늘이 전설이 될 것이다',
    price: 2000,
    point: 4.1,
    uploadDate: '2018-02-08',
    imgSrc: MockImg,
  },
  {
    id: 23,
    name: '잘나가요 세트',
    price: 15000,
    point: 3.2,
    uploadDate: '2018-02-09',
    imgSrc: MockImg,
  },
];

export const apiMock = {
  getProductList: (order: Order, page: number) => {
    return {
      totalProductCount: mockProductList.length,
      totalPage: Math.floor(mockProductList.length / 20) + 1,
      productList: getPageProducts(sortProductList(mockProductList, order), page),
    };
  },
};

const PRODUCT_PER_PAGE = 20;

const getPageProducts = (productList: ProductItemType[], page: number) => {
  if (page <= 0) return [];

  return productList.slice(PRODUCT_PER_PAGE * (page - 1), PRODUCT_PER_PAGE * page);
};

function sortProductList(productList: Array<ProductItemType>, order: Order) {
  switch (order) {
    case Order.popularity:
      return productList.sort((a: ProductItemType, b: ProductItemType) => b.point - a.point);
    case Order.priceLow:
      return productList.sort((a: ProductItemType, b: ProductItemType) => a.price - b.price);
    case Order.priceHigh:
      return productList.sort((a: ProductItemType, b: ProductItemType) => b.price - a.price);
    case Order.recent:
      return productList.sort(
        (a: ProductItemType, b: ProductItemType) =>
          new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      );
  }
}

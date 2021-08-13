import { mockProductList } from './data';
import { ProductItemType, Order } from '../../../types/product';

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

const sortProductList = (productList: Array<ProductItemType>, order: Order) => {
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
};

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
    case Order.Popularity:
      return [...productList].sort((a: ProductItemType, b: ProductItemType) => b.Point - a.Point);
    case Order.PriceLow:
      return [...productList].sort((a: ProductItemType, b: ProductItemType) => a.Price - b.Price);
    case Order.PriceHigh:
      return [...productList].sort((a: ProductItemType, b: ProductItemType) => b.Price - a.Price);
    case Order.Recent:
      return [...productList].sort(
        (a: ProductItemType, b: ProductItemType) =>
          new Date(b.UploadDate).getTime() - new Date(a.UploadDate).getTime()
      );
  }
};

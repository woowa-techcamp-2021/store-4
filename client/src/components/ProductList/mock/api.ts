import { mockProductList } from './data';
import { ProductListResponseType, ProductItemType, ProductListOrder } from '../../../types/product';

export const apiMock = {
  getProductList: (order: ProductListOrder, page: number): ProductListResponseType => {
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

const sortProductList = (productList: Array<ProductItemType>, order: ProductListOrder) => {
  switch (order) {
    case ProductListOrder.Popularity:
      return [...productList].sort((a: ProductItemType, b: ProductItemType) => b.point - a.point);
    case ProductListOrder.PriceLow:
      return [...productList].sort((a: ProductItemType, b: ProductItemType) => a.price - b.price);
    case ProductListOrder.PriceHigh:
      return [...productList].sort((a: ProductItemType, b: ProductItemType) => b.price - a.price);
    case ProductListOrder.Recent:
      return [...productList].sort(
        (a: ProductItemType, b: ProductItemType) =>
          new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      );
  }
};

import { mockProductList } from './data';
import { ProductItemType, ProductListOrder } from '../../../types/product';

export const apiMock = {
  getProductList: (order: ProductListOrder, page: number) => {
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
      return [...productList].sort((a: ProductItemType, b: ProductItemType) => b.Point - a.Point);
    case ProductListOrder.PriceLow:
      return [...productList].sort((a: ProductItemType, b: ProductItemType) => a.Price - b.Price);
    case ProductListOrder.PriceHigh:
      return [...productList].sort((a: ProductItemType, b: ProductItemType) => b.Price - a.Price);
    case ProductListOrder.Recent:
      return [...productList].sort(
        (a: ProductItemType, b: ProductItemType) =>
          new Date(b.UploadDate).getTime() - new Date(a.UploadDate).getTime()
      );
  }
};

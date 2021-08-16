import { Request, Response } from 'express';
import Product from '../models/product';
import productService from '../services/product-service';

type ProductRequestQuery = {
  category?: string;
  sort?: string;
  pageNum?: string;
  limit?: string;
};

export enum SORT_OPTION {
  RECOMMEND,
  POPULARITY,
  RECENT,
  PRICE_LOW,
  PRICE_HIGH,
}

export type FIND_OPTION = {
  categoryId: number;
  sortOption: SORT_OPTION;
  pageNum: number;
  limit: number;
};

const DEFAULT_OPTIONS: FIND_OPTION = {
  categoryId: -1,
  sortOption: SORT_OPTION.RECOMMEND,
  pageNum: 1,
  limit: 20,
};

export type ProductResponse = {
  products: Product[];
  totalPages: number;
};

export enum ERROR_TYPE {
  INVALID_CATEGORY,
  INVALID_PAGE,
  INVALID_SORT,
  PAGE_OVERFLOW,
  INVALID_LIMIT,
}

class ProductController {
  getAll = async (req: Request, res: Response) => {
    try {
      const findOption = this.buildFindOption(req.query as ProductRequestQuery);

      const productResponse = await productService.findAll(findOption);

      res.status(200).json(productResponse);
    } catch (err) {
      switch (err) {
        case ERROR_TYPE.INVALID_CATEGORY:
          return res.status(404).json({ message: '카테고리가 존재하지 않습니다' });
        case ERROR_TYPE.PAGE_OVERFLOW:
          return res.status(404).json({ message: '요청한 페이지가 총 페이지 수를 초과했습니다' });
        case ERROR_TYPE.INVALID_SORT:
          return res.status(400).json({ message: '요청한 정렬 방식이 잘못되었습니다' });
        case ERROR_TYPE.INVALID_PAGE:
          return res.status(400).json({ message: '요청한 페이지 형식이 잘못되었습니다' });
        case ERROR_TYPE.INVALID_LIMIT:
          return res.status(400).json({ message: '요청한 리밋 형식이 잘못되었습니다' });
        default:
          throw err;
      }
    }
  };

  private buildFindOption(query: ProductRequestQuery): FIND_OPTION {
    const { category, sort, pageNum, limit } = query;

    const categoryId = category === undefined ? DEFAULT_OPTIONS.categoryId : +category;
    if (isNaN(categoryId)) throw ERROR_TYPE.INVALID_CATEGORY;

    const sortOption =
      sort === undefined ? DEFAULT_OPTIONS.sortOption : this.convertSortOption(sort);

    const _pageNum = pageNum === undefined ? DEFAULT_OPTIONS.pageNum : +pageNum;
    if (isNaN(_pageNum)) throw ERROR_TYPE.INVALID_PAGE;

    const _limit = limit === undefined ? DEFAULT_OPTIONS.limit : +limit;
    if (isNaN(_limit)) throw ERROR_TYPE.INVALID_LIMIT;

    return { categoryId, sortOption, pageNum: _pageNum, limit: _limit };
  }

  private convertSortOption(sortOptionQuery: string) {
    switch (sortOptionQuery) {
      case 'recommend':
        return SORT_OPTION.RECOMMEND;
      case 'popularity':
        return SORT_OPTION.POPULARITY;
      case 'recent':
        return SORT_OPTION.RECENT;
      case 'priceLow':
        return SORT_OPTION.PRICE_LOW;
      case 'priceHigh':
        return SORT_OPTION.PRICE_HIGH;
      default:
        throw ERROR_TYPE.INVALID_SORT;
    }
  }
}

export default new ProductController();

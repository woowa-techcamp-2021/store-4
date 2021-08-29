import { IsInt, IsEnum, IsPositive, IsOptional, IsString } from 'class-validator';
import { SortOption } from '../enum/product';
import { isNone } from '../util/type-guard';
import BaseValidator from './base-validator';

const DEFAULT_QUERY = {
  category: null,
  sort: SortOption.Recommend,
  pageNum: 1,
  limit: 20,
};

class ProductFindQuery extends BaseValidator {
  @IsOptional()
  @IsInt()
  @IsPositive()
  category: number | null;

  @IsEnum([
    SortOption.Popularity,
    SortOption.Recommend,
    SortOption.Recent,
    SortOption.PriceLow,
    SortOption.PriceHigh,
  ])
  sort: SortOption;

  @IsInt()
  @IsPositive()
  pageNum: number;

  @IsInt()
  @IsPositive()
  limit: number;

  @IsString()
  @IsOptional()
  searchTerm: string | null;

  constructor(data: ProductFindQuery) {
    super();
    this.category = isNone(data.category) ? DEFAULT_QUERY.category : +data.category;
    this.sort = isNone(data.sort) ? DEFAULT_QUERY.sort : data.sort;
    this.pageNum = isNone(data.pageNum) ? DEFAULT_QUERY.pageNum : +data.pageNum;
    this.limit = isNone(data.limit) ? DEFAULT_QUERY.limit : +data.limit;
    this.searchTerm = data.searchTerm;
  }
}

export default ProductFindQuery;

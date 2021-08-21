import { IsOptional, IsInt, IsEnum, ValidateIf } from 'class-validator';
import { SortOption } from '../enum/product';
import BaseValidator from './base-validator';

const DEFAULT_QUERY = {
  category: null,
  sort: SortOption.Recommend,
  pageNum: 1,
  limit: 20,
};

class ProductFindQuery extends BaseValidator {
  @IsInt()
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  category: number | null;

  @IsEnum([
    SortOption.Popularity,
    SortOption.Recommend,
    SortOption.Recent,
    SortOption.PriceLow,
    SortOption.PriceHigh,
  ])
  @IsOptional()
  sort: SortOption;

  @IsInt()
  @IsOptional()
  pageNum: number;

  @IsInt()
  @IsOptional()
  limit: number;

  constructor(data: ProductFindQuery) {
    super();
    this.category = data.category === null ? DEFAULT_QUERY.category : +data.category;
    this.sort = data.sort ?? DEFAULT_QUERY.sort;
    this.pageNum = +(data.pageNum ?? DEFAULT_QUERY.pageNum);
    this.limit = +(data.limit ?? DEFAULT_QUERY.limit);
  }
}

export default ProductFindQuery;

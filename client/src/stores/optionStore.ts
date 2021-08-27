import { action, makeAutoObservable, observable } from 'mobx';
import { Option } from '../types/option';
import { ProductListOrder } from '../types/product';
import buildQueryString from '../utils/build-query-string';

const DEFAULT_OPTION: Option = {
  category: null,
  sort: ProductListOrder.Recommend,
  pageNum: 1,
  searchTerm: null,
};

const SORT_OPTION: { [key: string]: ProductListOrder } = {
  recommend: ProductListOrder.Recommend,
  popularity: ProductListOrder.Popularity,
  recent: ProductListOrder.Recent,
  priceHigh: ProductListOrder.PriceHigh,
  priceLow: ProductListOrder.PriceLow,
};

class OptionStore {
  @observable
  option: Option;

  constructor() {
    makeAutoObservable(this);
    this.option = this.parseQueryToOption(window.location.search);
  }

  parseQueryToOption(query: string) {
    const queryParams = new URLSearchParams(query);

    const category = Number(queryParams.get('category')) || DEFAULT_OPTION.category;
    const sort = SORT_OPTION[queryParams.get('sort') ?? DEFAULT_OPTION.sort];
    const pageNum = Number(queryParams.get('pageNum')) ?? DEFAULT_OPTION.pageNum;
    const searchTerm = queryParams.get('searchTerm') ?? DEFAULT_OPTION.searchTerm;

    return { category, sort, pageNum, searchTerm };
  }

  @action
  changeCategory(categoryId: number) {
    this.option = {
      category: categoryId,
      searchTerm: DEFAULT_OPTION.searchTerm,
      pageNum: DEFAULT_OPTION.pageNum,
      sort: DEFAULT_OPTION.sort,
    };
  }

  @action
  changeSortOption(sortOption: ProductListOrder) {
    this.option = {
      ...this.option,
      sort: sortOption,
      pageNum: DEFAULT_OPTION.pageNum,
    };
  }

  @action
  changePageNum(pageNum: number) {
    this.option = {
      ...this.option,
      pageNum,
    };
  }

  @action
  changeSearchTerm(searchTerm: string) {
    this.option = {
      searchTerm,
      category: DEFAULT_OPTION.category,
      sort: DEFAULT_OPTION.sort,
      pageNum: DEFAULT_OPTION.pageNum,
    };
  }

  get optionQuery(): string {
    return buildQueryString(this.option);
  }
}

export default new OptionStore();

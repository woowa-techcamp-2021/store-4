import { action, makeAutoObservable, observable } from 'mobx';
import { Option } from '../types/option';
import { ProductListOrder } from '../types/product';

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
    this.option = this.parseQueryToOption();
  }

  private parseQueryToOption() {
    const queryParams = new URLSearchParams(window.location.search);

    const category = +(queryParams.get('category') || '') || DEFAULT_OPTION.category;
    const sort = SORT_OPTION[queryParams.get('sort') || ''] || DEFAULT_OPTION.sort;
    const pageNum = +(queryParams.get('pageNum') || '') || DEFAULT_OPTION.pageNum;
    const searchTerm = queryParams.get('search') || DEFAULT_OPTION.searchTerm;

    return { category, sort, pageNum, searchTerm };
  }

  @action
  setCategory(categoryId: number) {
    this.option.searchTerm = null;
    this.option.category = categoryId;
  }

  @action
  setSortOption(sortOption: ProductListOrder) {
    this.option.sort = sortOption;
  }

  @action
  setPageNum(pageNum: number) {
    this.option.pageNum = pageNum;
  }

  @action
  setSearchTerm(searchTerm: string) {
    this.option.category = null;
    this.option.searchTerm = searchTerm;
  }
}

export default new OptionStore();

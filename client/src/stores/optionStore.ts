import { action, makeAutoObservable, observable } from 'mobx';
import { Option } from '../types/option';
import { ProductListOrder } from '../types/product';

const DEFAULT_OPTION: Option = {
  categoryId: null,
  sortOption: ProductListOrder.Recommend,
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

  private resetOption = () => (this.option = DEFAULT_OPTION);

  private parseQueryToOption() {
    const queryParams = new URLSearchParams(window.location.search);

    const categoryId = +(queryParams.get('category') || '') || DEFAULT_OPTION.categoryId;
    const sortOption = SORT_OPTION[queryParams.get('sort') || ''] || DEFAULT_OPTION.sortOption;
    const pageNum = +(queryParams.get('pageNum') || '') || DEFAULT_OPTION.pageNum;
    const searchTerm = queryParams.get('search') || DEFAULT_OPTION.searchTerm;

    return { categoryId, sortOption, pageNum, searchTerm };
  }

  @action
  setCategory(categoryId: number) {
    this.resetOption();
    this.option.categoryId = categoryId;
  }

  @action
  setSortOption(sortOption: ProductListOrder) {
    this.option.sortOption = sortOption;
  }

  @action
  setPageNum(pageNum: number) {
    this.option.pageNum = pageNum;
  }

  @action
  setSearchTerm(searchTerm: string) {
    this.resetOption();
    this.option.searchTerm = searchTerm;
  }
}

export default new OptionStore();

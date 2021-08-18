import { action, makeAutoObservable, observable } from 'mobx';
import { Option } from '../types/option';
import { ProductListOrder } from '../types/product';

const DEFAULT_OPTION: Option = {
  categoryId: null,
  sortOption: ProductListOrder.Recommend,
  pageNum: 1,
  searchTerm: null,
};

class OptionStore {
  @observable
  option: Option = DEFAULT_OPTION;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setCategory(categoryId: number) {
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
    this.option.searchTerm = searchTerm;
  }
}

export default new OptionStore();

import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import apis from '../api';
import Category from '../models/category';

class CategoryStore {
  @observable
  categories: Category[] = [];

  constructor() {
    makeAutoObservable(this);

    this.fetchCategories();
  }

  @action
  async fetchCategories() {
    const { categories } = await apis.categoryAPI.fetchCategories();

    runInAction(() => {
      this.categories = categories.map((category: Category) => new Category(category));
    });
  }
}

export default new CategoryStore();

import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import Category from '../models/category';

const fetchCategoriesAPI = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        categories: [
          {
            id: 1,
            name: '',
            childCategories: [],
          },
        ],
      });
    }, 1000);
  });
};

class CategoryStore {
  @observable
  categories: Category[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  async fetchCategories() {
    const { categories } = (await fetchCategoriesAPI()) as any;

    runInAction(() => {
      this.categories = categories.map((category: Category) => new Category(category));
    });
  }
}

export default new CategoryStore();

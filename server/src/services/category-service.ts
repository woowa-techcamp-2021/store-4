import _ from 'lodash';
import { getCustomRepository } from 'typeorm';
import Category from '../models/category';
import CategoryRepository from '../repositories/category-repository';

class CategoryService {
  private insertChildrenCategories(currentCategory: Category, categories: Category[]): Category {
    const copiedCurrentCategory = _.cloneDeep(currentCategory);
    const copiedCategories = _.cloneDeep(categories);

    copiedCurrentCategory.childCategories = copiedCategories
      .filter((category) => category.parentCategory?.id === currentCategory.id)
      .map((childCategory) => this.insertChildrenCategories(childCategory, copiedCategories));

    return copiedCurrentCategory;
  }

  async findCategoriesTree(): Promise<Category[]> {
    const categories = await getCustomRepository(CategoryRepository).findAllWithParent();
    const categoriesTree = categories
      .filter((category) => category.parentCategory === null)
      .map((rootCategory) => this.insertChildrenCategories(rootCategory, categories));

    return categoriesTree;
  }
}

export default new CategoryService();

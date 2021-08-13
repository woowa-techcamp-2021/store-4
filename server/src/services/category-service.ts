import _ from 'lodash';
import { getCustomRepository } from 'typeorm';
import Category from '../models/category';
import CategoryRepository from '../repositories/category-repository';

class CategoryService {
  private insertChildrenCategories(parentCategory: Category, categories: Category[]): Category {
    const copiedParentCategory = _.cloneDeep(parentCategory);
    const copiedCategories = _.cloneDeep(categories);

    copiedParentCategory.childCategories = copiedCategories
      .filter((category) => category.parentCategory?.id === parentCategory.id)
      .map((category) => this.insertChildrenCategories(category, copiedCategories));

    return copiedParentCategory;
  }

  async findCategoriesTree(): Promise<Category[]> {
    const categories = await getCustomRepository(CategoryRepository).findAllWithParent();
    const categoriesTree = categories
      .filter((category) => category.parentCategory === null)
      .map((parentCategory) => this.insertChildrenCategories(parentCategory, categories));

    return categoriesTree;
  }
}

export default new CategoryService();

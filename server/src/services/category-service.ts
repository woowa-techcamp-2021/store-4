import { getCustomRepository } from 'typeorm';
import Category from '../models/category';
import CategoryRepository from '../repositories/category-repository';

class CategoryService {
  private insertChildrenCategories(parentCategory: Category, categories: Category[]): Category {
    parentCategory.childCategories = categories
      .filter((category) => category.parentCategory?.id === parentCategory.id)
      .map((category) => this.insertChildrenCategories(category, categories));

    return parentCategory;
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

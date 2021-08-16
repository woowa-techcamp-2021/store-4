import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import Category from '../models/category';

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  findAllWithParent(): Promise<Category[]> {
    return createQueryBuilder(Category)
      .leftJoinAndSelect('Category.parentCategory', 'parentCategory')
      .getMany();
  }
}

export default CategoryRepository;

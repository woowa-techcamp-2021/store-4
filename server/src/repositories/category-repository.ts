import { EntityRepository, Repository } from 'typeorm';
import Category from '../models/category';

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {}

export default CategoryRepository;

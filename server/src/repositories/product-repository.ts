import { EntityRepository, Repository } from 'typeorm';
import Product from '../models/product';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {}

export default ProductRepository;

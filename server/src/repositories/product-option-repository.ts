import { EntityRepository, Repository } from 'typeorm';
import ProductOption from '../models/product-option';

@EntityRepository(ProductOption)
class ProductOptionRepository extends Repository<ProductOption> {}

export default ProductOptionRepository;

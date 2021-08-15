import { EntityRepository, Repository } from 'typeorm';
import ProductSelect from '../models/product-select';

@EntityRepository(ProductSelect)
class ProductSelectRepository extends Repository<ProductSelect> {}

export default ProductSelectRepository;

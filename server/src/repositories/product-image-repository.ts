import { EntityRepository, Repository } from 'typeorm';
import ProductImage from '../models/product-image';

@EntityRepository(ProductImage)
class ProductImageRepository extends Repository<ProductImage> {}

export default ProductImageRepository;

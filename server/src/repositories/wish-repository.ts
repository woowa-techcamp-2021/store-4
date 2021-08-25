import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import Wish from '../models/wish';

@EntityRepository(Wish)
class WishRepository extends Repository<Wish> {
  findByUserAndProduct(userId: number, productId: number): Promise<Wish | undefined> {
    return createQueryBuilder(Wish)
      .where('user_id = :userId', { userId })
      .andWhere('product_id = :productId', { productId })
      .getOne();
  }
}

export default WishRepository;

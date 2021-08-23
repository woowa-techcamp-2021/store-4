import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import Wish from '../models/wish';

@EntityRepository(Wish)
class WishRepository extends Repository<Wish> {
  findByUserAndProduct(userId: number, productId: number): Promise<Wish | undefined> {
    return createQueryBuilder(Wish)
      .where({
        userId,
        productId,
      })
      .getOne();
  }
}

export default WishRepository;

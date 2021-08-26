import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import Wish from '../models/wish';

@EntityRepository(Wish)
class WishRepository extends Repository<Wish> {
  findByUser(userId: number): Promise<Wish[]> {
    return createQueryBuilder(Wish)
      .where('user_id = :userId', { userId })
      .leftJoinAndSelect('Wish.product', 'product')
      .getMany();
  }

  findByUserAndProduct(userId: number, productId: number): Promise<Wish | undefined> {
    return createQueryBuilder(Wish)
      .where('user_id = :userId', { userId })
      .andWhere('product_id = :productId', { productId })
      .getOne();
  }

  findByUser(userId: number) {
    return createQueryBuilder(Wish).where('user_id = :userId', { userId });
  }
}

export default WishRepository;

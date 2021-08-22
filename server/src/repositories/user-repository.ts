import { EntityRepository, Repository, createQueryBuilder } from 'typeorm';
import User from '../models/user';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | undefined> {
    return createQueryBuilder(User).where({ email }).getOne();
  }

  findWithProduct(userId: number, productId: number): Promise<User | undefined> {
    return createQueryBuilder(User)
      .leftJoin('User.orders', 'Orders')
      .leftJoin('Orders.orderDetails', 'OrderDetails')
      .leftJoin('OrderDetails.product', 'Product')
      .where('User.id = :userId', { userId })
      .andWhere('Product.id = :productId', { productId })
      .getOne();
  }
}

export default UserRepository;

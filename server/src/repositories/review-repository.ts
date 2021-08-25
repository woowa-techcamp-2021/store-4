import { EntityRepository, Repository, createQueryBuilder } from 'typeorm';
import Review from '../models/review';

@EntityRepository(Review)
class ReviewRepository extends Repository<Review> {
  findByUser(userId: number): Promise<Review[]> {
    return createQueryBuilder(Review)
      .leftJoin('Review.user', 'user')
      .leftJoinAndSelect('Review.reviewImages', 'reviewImages')
      .leftJoinAndSelect('Review.product', 'product')
      .where('user.id = :userId', { userId })
      .orderBy('Review.createdAt', 'DESC')
      .getMany();
  }
}

export default ReviewRepository;

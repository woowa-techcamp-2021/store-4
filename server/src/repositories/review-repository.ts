import { EntityRepository, Repository, createQueryBuilder } from 'typeorm';
import Review from '../models/review';

@EntityRepository(Review)
class ReviewRepository extends Repository<Review> {
  async findByProduct(product: string): Promise<Review[]> {
    return createQueryBuilder(Review).where({ product }).getMany();
  }
}

export default ReviewRepository;

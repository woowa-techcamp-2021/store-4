import { EntityRepository, Repository } from 'typeorm';
import Review from '../models/review';

@EntityRepository(Review)
class ReviewRepository extends Repository<Review> {}

export default ReviewRepository;

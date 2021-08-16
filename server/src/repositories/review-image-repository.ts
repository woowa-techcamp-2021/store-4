import { EntityRepository, Repository } from 'typeorm';
import ReviewImage from '../models/review-image';

@EntityRepository(ReviewImage)
class ReviewImageRepository extends Repository<ReviewImage> {}

export default ReviewImageRepository;

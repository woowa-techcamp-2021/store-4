import { getCustomRepository } from 'typeorm';
import ReviewRepository from '../repositories/review-repository';

const DECIMAL_POINTS = 1;
const DEFAULT_POINT = 3;

class ReviewService {
  async getAveragePointOfProduct(productId: number): Promise<number> {
    const reviews = await getCustomRepository(ReviewRepository).findByProduct(productId);
    if (reviews.length === 0) return DEFAULT_POINT;

    const sum = reviews.map((review) => review.point).reduce((acc, val) => acc + val, 0);
    return parseFloat((sum / reviews.length).toFixed(DECIMAL_POINTS));
  }
}

export default new ReviewService();

import apis from '../api';
import { ReviewsByUserResponse } from '../types/review';

class ReviewStore {
  getReviewsByUser(userId: number): Promise<ReviewsByUserResponse> {
    return apis.reviewAPI.getReviewsByUser(userId);
  }

  postReview(formData: FormData, token: string): Promise<void> {
    return apis.reviewAPI.postReview(formData, token);
  }

  deleteReview(reviewIds: number[], token: string): Promise<void> {
    return apis.reviewAPI.deleteReviews(reviewIds, token);
  }
}

export default new ReviewStore();

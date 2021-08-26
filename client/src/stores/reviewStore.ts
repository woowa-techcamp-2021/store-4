import apis from '../api';
import { ReviewsByUserResponse } from '../types/review';
import userStore from './userStore';

class ReviewStore {
  getReviewsByUser(userId: number): Promise<ReviewsByUserResponse> {
    return apis.reviewAPI.getReviewsByUser(userId);
  }

  postReview(formData: FormData, token: string): Promise<void> {
    return apis.reviewAPI.postReview(formData, token);
  }

  deleteReview(reviewIds: number[]): Promise<void> {
    const token = userStore.token;

    return apis.reviewAPI.deleteReviews(reviewIds, token);
  }
}

export default new ReviewStore();

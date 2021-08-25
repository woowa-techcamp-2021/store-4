import request from '../lib/request';
import { ReviewsByUserResponse } from '../types/review';

class ReviewAPI {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  getReviewsByUser(userId: number): Promise<ReviewsByUserResponse> {
    return request<ReviewsByUserResponse>({
      url: `${this.baseURL}/api/review/user/${userId}`,
    });
  }

  postReview(formData: FormData, token: string): Promise<void> {
    return request<void>({
      url: `${this.baseURL}/api/review`,
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: formData,
    });
  }
}

export default ReviewAPI;
import apis from '../api';

class ReviewStore {
  postReview(formData: FormData, token: string): Promise<void> {
    return apis.reviewAPI.postReview(formData, token);
  }
}

export default new ReviewStore();

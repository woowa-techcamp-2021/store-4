import request from '../lib/request';

class ReviewAPI {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
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

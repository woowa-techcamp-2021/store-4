import ReviewImage from './review-image';

class Review {
  id: number;
  content: string;
  point: number;
  reviewImages: ReviewImage[];
  createdAt: Date;
  updatedAt: Date;

  constructor(review: Review) {
    this.id = review.id;
    this.content = review.content;
    this.point = review.point;
    this.reviewImages = review.reviewImages.map((reviewImage) => new ReviewImage(reviewImage));
    this.createdAt = review.createdAt;
    this.updatedAt = review.updatedAt;
  }
}

export default Review;

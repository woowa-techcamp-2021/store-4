import Product from './product';
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
    this.createdAt = new Date(review.createdAt);
    this.updatedAt = new Date(review.updatedAt);
  }
}

export class ReviewWithProduct extends Review {
  product: Product;

  constructor(review: ReviewWithProduct) {
    super(review);
    this.product = new Product(review.product);
  }

  get productName(): string {
    return this.product.name;
  }
}

export default Review;

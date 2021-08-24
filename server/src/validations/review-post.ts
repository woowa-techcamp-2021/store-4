import { IsNotEmpty, IsOptional, Length, Max, Min } from 'class-validator';
import BaseValidator from './base-validator';

class ReviewPost extends BaseValidator {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @Min(1)
  @Max(5)
  point: number;

  @IsOptional()
  @Length(1, 250)
  content: string;

  @IsNotEmpty()
  imageLocations: string[];

  constructor(data: ReviewPost) {
    super();
    this.productId = data.productId;
    this.userId = data.userId;
    this.point = data.point;
    this.content = data.content;
    this.imageLocations = data.imageLocations;
  }
}

export default ReviewPost;

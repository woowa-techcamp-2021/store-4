import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import BaseValidator from './base-validator';

class ReviewPost extends BaseValidator {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  productId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  point: number;

  @IsOptional()
  @IsString()
  @Length(1, 250)
  content: string;

  @IsNotEmpty()
  @IsArray()
  imageLocations: string[];

  constructor(data: ReviewPost) {
    super();
    this.productId = +data.productId;
    this.userId = +data.userId;
    this.point = +data.point;
    this.content = data.content;
    this.imageLocations = data.imageLocations;
  }
}

export default ReviewPost;

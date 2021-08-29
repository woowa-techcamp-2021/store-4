import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import BaseValidator from './base-validator';

class ReviewDelete extends BaseValidator {
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  reviewIds: number[];

  constructor(data: ReviewDelete) {
    super();
    this.reviewIds = data.reviewIds;
  }
}

export default ReviewDelete;

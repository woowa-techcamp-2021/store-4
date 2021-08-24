import { Request, Response } from 'express';
import reviewService from '../services/review-service';
import { isNone } from '../util/type-guard';
import ReviewPost from '../validations/review-post';
import numberParamValidator from '../validations/number-params';

class ReviewController {
  async post(req: Request, res: Response) {
    const { userId, productId, point, content } = req.body;
    const imageLocations = req.images || [];

    const reviewPost = new ReviewPost({
      userId: numberParamValidator(userId),
      productId: numberParamValidator(productId),
      point: numberParamValidator(point),
      content: content || '',
      imageLocations,
    } as ReviewPost);

    await reviewPost.validate();

    const review = await reviewService.postReview(reviewPost);

    res.status(201).json({ reviewId: review.id });
  }

  async delete(req: Request, res: Response) {
    const userId = req.decoded?.id;
    if (isNone(userId)) {
      res.end();
      return;
    }

    const { reviewId } = req.params;
    // validator 추가 필요

    await reviewService.deleteReview({ userId, reviewId: +reviewId });

    res.status(200).send('deleted');
  }
}

export default new ReviewController();

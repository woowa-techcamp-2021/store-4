import { Request, Response } from 'express';
import reviewService from '../services/review-service';
import { isNone } from '../util/type-guard';
import numberParamValidator from '../validations/number-params';
import ReviewPost from '../validations/review-post';

class ReviewController {
  async post(req: Request, res: Response) {
    const { body, images } = req;

    const reviewPost = new ReviewPost({
      ...body,
      imageLocations: images || [],
    });
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

    const reviewId = numberParamValidator(req.params.reviewId);

    await reviewService.deleteReview({ userId, reviewId });

    res.status(200).send('deleted');
  }
}

export default new ReviewController();

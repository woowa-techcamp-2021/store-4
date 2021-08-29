import { Request, Response } from 'express';
import reviewService from '../services/review-service';
import { isNone } from '../util/type-guard';
import numberParamValidator from '../validations/number-params';
import ReviewPost from '../validations/review-post';
import ReviewDelete from '../validations/review-delete';

class ReviewController {
  async getByUser(req: Request, res: Response) {
    const userId = numberParamValidator(req.params.userId);

    const userReviews = await reviewService.getReviewByUser(userId);

    res.status(200).json({ reviews: userReviews });
  }

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

    const reviewDelete = new ReviewDelete(req.body);
    await reviewDelete.validate();

    await reviewService.deleteReview({ userId, reviewIds: reviewDelete.reviewIds });

    res.status(200).json({});
  }
}

export default new ReviewController();

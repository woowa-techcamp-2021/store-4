import { Request, Response } from 'express';
import reviewService from '../services/review-service';
import { isNone } from '../util/type-guard';

class ReviewController {
  async post(req: Request, res: Response) {
    const userId = req.decoded?.id;
    if (isNone(userId)) {
      res.end();
      return;
    }

    const { productId, point, content } = req.body;
    // validator 추가 필요

    const review = await reviewService.postReview({
      userId,
      productId: +productId,
      point: +point,
      content,
    });

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

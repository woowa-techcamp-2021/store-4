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

    reviewService.postReview(userId);

    res.status(200).json({ userId });
  }
}

export default new ReviewController();

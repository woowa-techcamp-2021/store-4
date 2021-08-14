import { Request, Response } from 'express';

class ProductController {
  find(req: Request, res: Response) {
    res.send('GET /product');
  }
}

export default new ProductController();

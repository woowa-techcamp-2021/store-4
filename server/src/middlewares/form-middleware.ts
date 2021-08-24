import { Request, Response, NextFunction } from 'express';
import formidable from 'formidable';
import s3Service from '../services/s3-service';

const formMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
    }

    req.body = fields;

    let images: formidable.File[] = [];
    if (Array.isArray(files.images)) {
      images = files.images;
    }
    // 업로드한 파일이 한 개 존재
    else if (files.images.size > 0) {
      images = [files.images];
    }
    // 파일 없음
    else {
      next();
      return;
    }

    Promise.all(images.map((image) => s3Service.uploadImage(image)))
      .then((imageLocations) => {
        req.images = imageLocations;
        next();
      })
      .catch((err) => {
        next(err);
      });
  });
};

export default formMiddleware;

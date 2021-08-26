import AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import dotenv from '../config/dotenv';
import formidable from 'formidable';
import sharp from 'sharp';
import uuid from '../util/uuid';

const DEFAULT_FILE_TYPE = 'image/webp';
const ACCESS_CONTROL = 'public-read';

const S3_PARAMS: PutObjectRequest = {
  Bucket: dotenv.AWS_S3_BUCKET,
  ContentType: DEFAULT_FILE_TYPE,
  ACL: ACCESS_CONTROL,
  Key: '',
  Body: undefined,
};

AWS.config.update({
  accessKeyId: dotenv.AWS_ACCESS_KEY,
  secretAccessKey: dotenv.AWS_SECRET,
  region: 'ap-northeast-2',
});
const S3 = new AWS.S3();

class S3Service {
  async uploadImage(imageFile: formidable.File): Promise<string> {
    const S3Params = { ...S3_PARAMS };
    S3Params.Key = `${uuid()}.webp`;

    const sharpImage = await sharp(imageFile.path).resize(500).webp().toBuffer();
    S3Params.Body = sharpImage;

    const data = await S3.upload(S3Params).promise();
    return data.Location;
  }
}

export default new S3Service();

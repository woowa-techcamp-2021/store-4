import AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import dotenv from '../config/dotenv';
import formidable from 'formidable';
import fs from 'fs';

AWS.config.update({
  accessKeyId: dotenv.AWS_ACCESS_KEY,
  secretAccessKey: dotenv.AWS_SECRET,
  region: 'ap-northeast-2',
});
const S3 = new AWS.S3();

const DEFAULT_FILE_TYPE = 'image/png';
const ACCESS_CONTROL = 'public-read';

class S3Service {
  private generateS3Params(imageFile: formidable.File): PutObjectRequest {
    return {
      Bucket: dotenv.AWS_S3_BUCKET,
      Key: Date.now().toString(),
      ContentType: imageFile.type || DEFAULT_FILE_TYPE,
      ACL: ACCESS_CONTROL,
      Body: fs.createReadStream(imageFile.path),
    };
  }

  async uploadImage(imageFile: formidable.File): Promise<string> {
    const S3Params = this.generateS3Params(imageFile);

    const data = await S3.upload(S3Params).promise();
    return data.Location;
  }
}

export default new S3Service();

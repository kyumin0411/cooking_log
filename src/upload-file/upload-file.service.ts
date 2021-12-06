import { HttpStatus, Injectable } from '@nestjs/common';
import * as ModelDTO from 'src/dto/model.dto';
import * as ImageDTO from 'src/dto/image.dto';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadFileService {
  s3 = new AWS.S3({
    accessKeyId: 'AKIA2VXBQMY7P4HEDPAQ',
    secretAccessKey: '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',
    region: 'ap-northeast-2',
  });
  async uploadFile(image: Express.MulterS3.File) {
    const result = new ModelDTO.ResponseDTO();

    if (!image) {
      result.message = 'Image Not Exist.';
      result.payload = '';
    } else {
      const Key = `${Date.now().toString()}-${image.originalname}`;

      const imageResult = await this.s3
        .upload({
          Bucket: process.env.AWS_S3_BUCKET_NAME ?? '',
          ACL: 'private',
          Key,
          Body: image.buffer,
        })
        .promise();
      const imageUrl = new ImageDTO.PostImageResDTO();
      imageUrl.url = imageResult.Location ?? '';
      result.message = 'Image Upload Success.';
      result.payload = imageUrl;
    }

    result.code = HttpStatus.OK;
    return result;
  }
}

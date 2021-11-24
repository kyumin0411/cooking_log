import { HttpStatus, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as ModelDTO from 'src/dto/model.dto';
import { createImageURL } from 'src/util/multerOption';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

@Injectable()
export class ImageService {
  async uploadImage(files: File[]) {
    const result = new ModelDTO.ResponseDTO();
    const payloadURLs = [];
    for (const file of files) {
      payloadURLs.push(createImageURL(file));
    }

    result.code = HttpStatus.OK;
    result.message = 'upload images success.';
    result.payload = payloadURLs;
    return result;
  }
}

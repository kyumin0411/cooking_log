import { HttpStatus, Injectable } from '@nestjs/common';
import * as ModelDTO from 'src/dto/model.dto';
import * as ImageDTO from 'src/dto/image.dto';

@Injectable()
export class UploadFileService {
  async createImageUrl(image: Express.MulterS3.File) {
    const result = new ModelDTO.ResponseDTO();

    const imageUrl = new ImageDTO.PostImageResDTO();
    imageUrl.url = image?.location;

    result.code = HttpStatus.OK;
    result.message = 'Image Upload Success.';
    result.payload = imageUrl;
    return result;
  }
}

import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { UploadFileService } from 'src/upload-file/upload-file.service';
import { PostImagesBodyDTO, PostImageBodyDTO } from 'src/dto/image.dto';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

@ApiTags('Files: 이미지 파일 관리')
@Controller('files')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multerS3({
        s3: s3,
        bucket: 'cookinglog',
        acl: 'public-read-write',
        key: function (request, image, cb) {
          var ext = image.mimetype.split('/')[1];
          if (!['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(ext)) {
            return cb(new Error('Only images are allowed'));
          } else cb(null, `${Date.now().toString()}-${image.originalname}`);
        },
      }),
      limits: {},
    }),
  )
  async uploadFile(@UploadedFiles() image: Express.MulterS3.File) {
    console.log(image);
    return await this.uploadFileService.uploadFile(image);
  }
}

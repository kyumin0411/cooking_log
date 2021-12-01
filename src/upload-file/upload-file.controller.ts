import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { UploadFileService } from 'src/upload-file/upload-file.service';
import { Response } from 'express';

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
        bucket: process.env.AWS_S3_BUCKET_NAME ?? '',
        acl: 'private',
        key: function (request, image, cb) {
          cb(null, `${Date.now().toString()}-${image.originalname}`);
        },
      }),
      limits: {},
    }),
  )
  async uploadFile(
    @Res() res: Response,
    @UploadedFile() image: Express.MulterS3.File,
  ) {
    const result = await this.uploadFileService.uploadFile(image);
    res.status(result.code).json(result);
  }
}

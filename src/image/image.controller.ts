import {
  Controller,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import { multerOptions } from 'src/util/multerOption';
import { Request, Response } from 'express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import * as ImageDTO from 'src/dto/image.dto';

const s3 = new AWS.S3();

@ApiTags('Images: 이미지 파일 관리')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(
    // FilesInterceptor('images', null, {
    //   storage: multerS3({
    //     s3: s3,
    //     bucket: process.env.AWS_S3_BUCKET_NAME,
    //     acl: 'public-read',
    //     key: function (req, file, cb) {
    //       cb(null, file.originalname);
    //     },
    //   }),
    // }),
    FilesInterceptor('images', null, multerOptions),
  )
  @ApiBody({
    description: '업로드할 파일',
    type: ImageDTO.PostImageBodyDTO,
  })
  async uploadImage(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFiles() files: File[],
  ) {
    console.log(files);
    const result = await this.imageService.uploadImage(files);
    res.status(result.code).json(result);
  }
}

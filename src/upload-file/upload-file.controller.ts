import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadFileService } from 'src/upload-file/upload-file.service';
import { Response } from 'express';

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
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @Res() res: Response,
    @UploadedFile() image: Express.MulterS3.File,
  ) {
    const result = await this.uploadFileService.uploadFile(image);
    res.status(result.code).json(result);
  }
}

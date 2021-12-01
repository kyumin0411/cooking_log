import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from 'aws-sdk';
import { UploadFile } from 'src/entity';
import { Repository } from 'typeorm';
import { PostImagesBodyDTO, PostImageBodyDTO } from 'src/dto/image.dto';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

@Injectable()
export class UploadFileService {
  constructor(
    @InjectRepository(UploadFile)
    private uploadFileRepository: Repository<UploadFile>,
  ) {}

  async uploadFile(image: Express.MulterS3.File) {
    const uploadfiles = [];
    console.log(image);
    // const files = postImagesBodyDTO.files;
    // if (typeof files === 'object') {
    //   for (const element of files) {
    //     const file = new UploadFile();
    //     // file.originalName = element.originalname;
    //     // file.encoding = element.encoding;
    //     // file.mimeType = element.mimetype;
    //     // file.size = element.size;
    //     // file.url = element.path;
    //     uploadfiles.push(file);
    //   }
    // }

    try {
      return { data: await this.uploadFileRepository.save(uploadfiles) };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

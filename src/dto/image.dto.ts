import { ApiProperty } from '@nestjs/swagger';
import { Image } from 'aws-sdk/clients/iotanalytics';
import FormData from 'form-data';

export class PostImagesBodyDTO {
  @ApiProperty({
    description: '업로드할 파일들',
    type: 'formdata',
    isArray: true,
  })
  images: FormData[];
}
export class PostImageBodyDTO {
  @ApiProperty({ description: '업로드할 파일', type: 'formdata' })
  image: FormData;
}

export class PostImageResDTO {
  @ApiProperty({ description: '업로드 파일 url' })
  url: String;
}

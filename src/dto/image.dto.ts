import { ApiProperty } from '@nestjs/swagger';
import { Image } from 'aws-sdk/clients/iotanalytics';

export class PostImagesBodyDTO {
  @ApiProperty({
    description: '업로드할 파일들',
    type: 'formdata',
    isArray: true,
  })
  files: FormData[];
}
export class PostImageBodyDTO {
  @ApiProperty({ description: '업로드할 파일', type: 'formdata' })
  file: Image;
}

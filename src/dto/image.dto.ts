import { ApiProperty } from '@nestjs/swagger';

export class PostImageBodyDTO {
  @ApiProperty({ description: '업로드할 파일', type: 'formdata' })
  files: FormData[];
}

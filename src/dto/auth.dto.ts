import { ApiProperty } from '@nestjs/swagger';

export class LoginResDTO {
  @ApiProperty({ description: 'access token' })
  accessToken: string;
}
export class LoginReqBodyDTO {
  @ApiProperty({ description: '아이디' })
  userId: string;
  @ApiProperty({ description: '비밀번호' })
  password: string;
}

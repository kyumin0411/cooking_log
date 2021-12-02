import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserDTO } from 'src/dto/model.dto';

export class PostUserBodyDTO extends UserDTO {}

export class PostUserResDTO extends PickType(UserDTO, ['userId', 'userName']) {}

export class GetUserResDTO extends PickType(UserDTO, ['userId', 'userName']) {}

export class GetUsersResDTO {
  @ApiProperty({ description: '총 유저 수' })
  total: number;
  @ApiProperty({ description: '유저', type: UserDTO, isArray: true })
  users: GetUserResDTO[];
}

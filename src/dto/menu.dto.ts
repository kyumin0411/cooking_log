import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { MenuDTO } from 'src/dto/model.dto';

export class PostMenuBodyDTO extends PickType(MenuDTO, [
  'title',
  'image',
  'difficulty',
  'ingredients',
]) {}

export class PostMenuResDTO extends MenuDTO {}

export class GetMenusResDTO {
  @ApiProperty({ description: '등록된 메뉴 개수' })
  total: number;
  @ApiProperty({ description: '메뉴 데이터' })
  menus: MenuDTO[];
}

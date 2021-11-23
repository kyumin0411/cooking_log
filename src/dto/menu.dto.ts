import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { MenuDTO, RecipeDTO } from 'src/dto/model.dto';
export class PostMenuBodyDTO extends PickType(MenuDTO, [
  'title',
  'image',
  'difficulty',
  'ingredients',
]) {}

export class PostMenuResDTO extends MenuDTO {}

export class PatchMenuReqDTO extends PartialType(
  PickType(MenuDTO, ['title', 'image', 'difficulty', 'ingredients']),
) {
  @ApiProperty({
    description: `즐겨찾기 switch [ 'true' : bookmark change, 'false' : 그대로 ]`,
    required: false,
  })
  changeBookmark?: string;
}

export class PatchMenuResDTO extends MenuDTO {}

export class GetMenusReqDTO {
  @ApiProperty({ description: '검색할 요리 제목', required: false })
  title?: string;
  @ApiProperty({
    description: '요리 재료로 검색 ( and 조건으로 검색 )',
    required: false,
    isArray: true,
  })
  ingredients?: string[];
  @ApiProperty({
    description: `즐겨찾기로 검색 [ 'true' : 즐겨찾기 된 메뉴만 조회 ]`,
    required: false,
  })
  bookmark?: string;
}

export class GetMenusResDTO {
  @ApiProperty({ description: '등록된 메뉴 개수' })
  total: number;
  @ApiProperty({ description: '메뉴 데이터', type: MenuDTO, isArray: true })
  menus: MenuDTO[];
}

export class GetMenuResDTO extends MenuDTO {
  @ApiProperty({ description: '레시피' })
  recipes: RecipeDTO[];
}

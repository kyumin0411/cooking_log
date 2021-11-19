import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { RecipeDTO, RecipesDTO } from 'src/dto/model.dto';

class PostRecipeDTO extends PartialType(
  PickType(RecipeDTO, ['image', 'description']),
) {}
export class PostRecipesReqBodyDTO {
  @ApiProperty({
    description: '레시피',
    type: PostRecipeDTO,
    isArray: true,
    example: `{
  "recipes": [
    {
      "description": "계란 3개를 반숙합니다.",
      "image": "eqq.jpg"
    },
    {
      "description": "빵을 굽습니다.",
      "image": "bread.jpg"
    },
    {
      "description": "빵 사이에 계란을 반으로 잘라 넣고 위에 허브 가루를 뿌립니다.",
      "image": "herb.jpg"
    }
  ]
}`,
  })
  recipes: PostRecipeDTO[];
}

export class PostRecipesResDTO extends RecipesDTO {
  @ApiProperty({ description: '레시피 총 개수' })
  total: number;
}

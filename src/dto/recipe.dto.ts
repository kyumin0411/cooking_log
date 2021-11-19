import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { RecipeDTO, RecipesDTO } from 'src/dto/model.dto';

class PostRecipeDTO extends PartialType(
  PickType(RecipeDTO, ['image', 'description']),
) {}
export class PostRecipesReqBodyDTO {
  @ApiProperty({ description: '레시피', type: PostRecipeDTO, isArray: true })
  recipes: PostRecipeDTO[];
}

export class PostRecipesResDTO extends RecipesDTO {
  @ApiProperty({ description: '레시피 총 개수' })
  total: number;
}

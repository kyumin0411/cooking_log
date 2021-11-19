import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecipeService } from './recipe.service';
import * as RecipeDTO from '../dto/recipe.dto';

@ApiTags('Recipes: 레시피 데이터 관리')
@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post('/create/:menuId')
  @ApiOperation({ summary: '레시피 생성' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RecipeDTO.PostRecipesResDTO,
    description: '',
  })
  @ApiParam({
    name: 'menuId',
    type: 'number',
    description: '레시피를 생성하는 메뉴 아이디',
  })
  async postRecipes(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: RecipeDTO.PostRecipesReqBodyDTO,
    @Param('menuId') menuId: number,
  ) {
    const result = await this.recipeService.postRecipes(menuId, body);
    res.status(result.code).json(result);
  }
}

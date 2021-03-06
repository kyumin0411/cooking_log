import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RecipeService } from './recipe.service';
import * as RecipeDTO from '../dto/recipe.dto';

@ApiTags('Recipes: 레시피 관리')
@ApiBearerAuth()
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

  @Put('/update/:menuId')
  @ApiOperation({ summary: '레시피 수정' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RecipeDTO.PostRecipesResDTO,
    description: '',
  })
  @ApiParam({
    name: 'menuId',
    type: 'number',
    description: '수정할 레시피 아이디',
  })
  async putRecipes(
    @Req() req: Request,
    @Res() res: Response,
    @Param('menuId') menuId: number,
    @Body() body: RecipeDTO.PutRecipesReqBodyDTO,
  ) {
    const result = await this.recipeService.putRecipes(menuId, body);
    res.status(result.code).json(result);
  }

  @Get('/:menuId')
  @ApiOperation({ summary: '레시피 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RecipeDTO.GetRecipesResDTO,
    description: '',
  })
  @ApiParam({
    name: 'menuId',
    type: 'number',
    description: '레시피를 조회할 메뉴 아이디',
  })
  async getRecipes(
    @Req() req: Request,
    @Res() res: Response,
    @Param('menuId') menuId: number,
  ) {
    const result = await this.recipeService.getRecipes(menuId);
    res.status(result.code).json(result);
  }

  @Delete('/:recipeId')
  @ApiOperation({ summary: '레시피 삭제' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: '',
    description: '',
  })
  @ApiParam({
    name: 'recipeId',
    type: 'number',
    description: '삭제할 레시피 아이디',
  })
  async deleteRecipe(
    @Req() req: Request,
    @Res() res: Response,
    @Param('recipeId') recipeId: number,
  ) {
    const result = await this.recipeService.deleteRecipe(recipeId);
    res.status(result.code).json(result);
  }
}

import { HttpStatus, Injectable } from '@nestjs/common';
import * as ModelDTO from '../dto/model.dto';
import * as RecipeDTO from '../dto/recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu, Recipe } from 'src/entity';
import { Like, Repository } from 'typeorm';

const moment = require('moment');

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,

    @InjectRepository(Menu)
    private menusRepository: Repository<Menu>,
  ) {}

  async postRecipes(
    menuId: number,
    postRecipesBodyDTO: RecipeDTO.PostRecipesReqBodyDTO,
  ) {
    const result = new ModelDTO.ResponseDTO();

    const findMenu = await this.menusRepository.findOne(menuId);

    const insertRecipe = postRecipesBodyDTO.recipes.map((value) => {
      const newRecipe = new Recipe();

      newRecipe.menu = findMenu;
      newRecipe.image = value.image;
      newRecipe.description = value.description;

      return newRecipe;
    });

    await this.recipeRepository.insert(insertRecipe);

    const postRecipesResDTO = new RecipeDTO.PostRecipesResDTO();

    const findPostRecipes = await this.recipeRepository.findAndCount({
      where: { menu: findMenu },
    });

    postRecipesResDTO.total = findPostRecipes[1];
    postRecipesResDTO.menuId = menuId;
    postRecipesResDTO.recipes = findPostRecipes[0].map((value) => {
      delete value.menu;
      return value;
    });

    result.code = HttpStatus.OK;
    result.message = '';
    result.payload = postRecipesResDTO;

    return result;
  }
}
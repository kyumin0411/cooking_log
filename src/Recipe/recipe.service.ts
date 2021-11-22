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

    await Promise.all(
      postRecipesBodyDTO.recipes.map(async (value) => {
        const newRecipe = new Recipe();

        newRecipe.menu = findMenu;
        newRecipe.image = value.image;
        newRecipe.description = value.description;

        await this.recipeRepository.insert(newRecipe);
      }),
    );

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

  async putRecipes(
    menuId: number,
    PutRecipesReqBodyDTO: RecipeDTO.PutRecipesReqBodyDTO,
  ) {
    const result = new ModelDTO.ResponseDTO();

    const findMenu = await this.menusRepository.findOne(menuId);

    if (findMenu) {
      await this.recipeRepository.delete({ menu: findMenu });
      const postRecipesResult = await this.postRecipes(
        menuId,
        PutRecipesReqBodyDTO,
      );

      result.message = postRecipesResult.message;
      result.payload = postRecipesResult.payload;
    } else {
      result.message = '[Error] Menu Not Found.';
      result.payload = 'null';
    }

    result.code = HttpStatus.OK;

    return result;
  }

  async getRecipes(menuId: number) {
    const result = new ModelDTO.ResponseDTO();

    const findMenu = await this.menusRepository.findOne(menuId);

    if (findMenu) {
      const findRecipes = await this.recipeRepository.findAndCount({
        menu: findMenu,
      });

      const getRecipesResDTO = new RecipeDTO.GetRecipesResDTO();

      getRecipesResDTO.total = findRecipes[1];
      getRecipesResDTO.menuId = menuId;
      getRecipesResDTO.recipes = findRecipes[0];

      result.message = '';
      result.payload = getRecipesResDTO;
    } else {
      result.message = '[Error] Menu Not Found.';
      result.payload = null;
    }

    result.code = HttpStatus.OK;

    return result;
  }

  async deleteRecipe(recipeId: number) {
    const result = new ModelDTO.ResponseDTO();

    const findRecipe = await this.recipeRepository.findOne(recipeId);

    if (findRecipe) {
      await this.recipeRepository.delete(recipeId);
      result.message = 'Delete Recipe Success.';
    } else {
      result.message = '[Error] Recipe Not Found.';
    }

    result.code = HttpStatus.OK;
    result.payload = null;

    return result;
  }
}

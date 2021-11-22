import { HttpStatus, Injectable } from '@nestjs/common';
import * as ModelDTO from '../dto/model.dto';
import * as MenuDTO from '../dto/menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from 'src/entity';
import { In, Like, Repository } from 'typeorm';

const moment = require('moment');

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menusRepository: Repository<Menu>,
  ) {}

  async postMenu(postMenuBodyDTO: MenuDTO.PostMenuBodyDTO) {
    const result = new ModelDTO.ResponseDTO();

    const createdMenu = new Menu();

    createdMenu.title = postMenuBodyDTO.title;
    createdMenu.difficulty = postMenuBodyDTO.difficulty;
    createdMenu.image = postMenuBodyDTO.image;
    createdMenu.ingredients = postMenuBodyDTO.ingredients.join(',');

    await this.menusRepository.insert(createdMenu);

    const checkCreatedMenu = await this.menusRepository.findOne({
      where: { title: createdMenu.title },
    });

    if (checkCreatedMenu) {
      const postMenuResDTO = new MenuDTO.PostMenuResDTO();
      postMenuResDTO.id = checkCreatedMenu.id;
      postMenuResDTO.createdAt = moment(checkCreatedMenu.createdAt).format(
        'YYYY-MM-DDTHH:mm:ss',
      );
      postMenuResDTO.updatedAt = moment(checkCreatedMenu.updatedAt).format(
        'YYYY-MM-DDTHH:mm:ss',
      );
      postMenuResDTO.title = checkCreatedMenu.title;
      postMenuResDTO.difficulty = checkCreatedMenu.difficulty;
      postMenuResDTO.image = checkCreatedMenu.image;
      postMenuResDTO.ingredients = checkCreatedMenu.ingredients.split(',');
      postMenuResDTO.bookmark = checkCreatedMenu.bookmark;
      result.message = 'Create Menu Success.';
      result.payload = postMenuResDTO;
    } else {
      result.message = 'Create Menu Fail.';
      result.payload = null;
    }

    result.code = HttpStatus.OK;
    return result;
  }

  async getMenus(getMenusReqDTO: MenuDTO.GetMenusReqDTO) {
    const result = new ModelDTO.ResponseDTO();

    const { title, ingredients } = getMenusReqDTO;

    const findQuery = {};

    const inQuery = [];
    if (title) {
      findQuery['title'] = Like(`%${title}%`);
    }

    if (ingredients) {
      if (typeof ingredients === 'string') {
        inQuery.push(`%${ingredients}%`);
      } else {
        ingredients.forEach((ingredient) => {
          inQuery.push(`%${ingredient}%`);
        });
      }
      findQuery['ingredients'] = Like(In(inQuery));
    }
    const getMenus = await this.menusRepository.find({
      ingredients: Like(In(['%허브%', '%토마토%', '%우유%'])),
    });

    const testMenus = await this.menusRepository
      .createQueryBuilder()
      .where('ingredients LIKE :one OR :two OR :three', {
        one: '%허브%',
        two: '%토마토%',
        three: '%우유%',
      })
      .getMany();

    const getMenusPayload = new MenuDTO.GetMenusResDTO();

    getMenusPayload.total = getMenus.length;
    getMenusPayload.menus = getMenus.map((menu) => {
      const getMenu = new ModelDTO.MenuDTO();

      getMenu.id = menu.id;
      getMenu.createdAt = moment(menu.createdAt).format('YYYY-MM-DDTHH:mm:ss');
      getMenu.updatedAt = moment(menu.updatedAt).format('YYYY-MM-DDTHH:mm:ss');
      getMenu.title = menu.title;
      getMenu.difficulty = menu.difficulty;
      getMenu.image = menu.image;
      getMenu.ingredients = menu.ingredients.split(',');
      getMenu.bookmark = menu.bookmark;

      return getMenu;
    });

    result.code = HttpStatus.OK;
    result.message = '';
    result.payload = getMenusPayload;
    return result;
  }

  async getMenu(menuId: number, recipes: ModelDTO.RecipesDTO) {
    const result = new ModelDTO.ResponseDTO();

    const findMenu = await this.menusRepository.findOne(menuId);

    if (findMenu) {
      const getMenuResDTO = new MenuDTO.GetMenuResDTO();

      getMenuResDTO.id = findMenu.id;
      getMenuResDTO.createdAt = moment(findMenu.createdAt).format(
        'YYYY-MM-DDTHH:mm:ss',
      );
      getMenuResDTO.updatedAt = moment(findMenu.updatedAt).format(
        'YYYY-MM-DDTHH:mm:ss',
      );
      getMenuResDTO.title = findMenu.title;
      getMenuResDTO.image = findMenu.image;
      getMenuResDTO.difficulty = findMenu.difficulty;
      getMenuResDTO.bookmark = findMenu.bookmark;
      getMenuResDTO.ingredients = findMenu.ingredients.split(',');
      getMenuResDTO.recipes = recipes.recipes;

      result.message = '';
      result.payload = getMenuResDTO;
    } else {
      result.message = '[Error] Menu Not Found.';
      result.payload = null;
    }

    result.code = HttpStatus.OK;

    return result;
  }
  async patchMenu(menuId: string, patchMenuReqDTO: MenuDTO.PatchMenuReqDTO) {
    const result = new ModelDTO.ResponseDTO();

    const { title, image, difficulty, bookmark, ingredients } = patchMenuReqDTO;

    const findMenu = await this.menusRepository.findOne(menuId);

    if (findMenu) {
      await this.menusRepository
        .createQueryBuilder('Menu')
        .update({
          title: title ?? findMenu.title,
          image: image ?? findMenu.image,
          difficulty: difficulty ?? findMenu.difficulty,
          bookmark: bookmark ?? findMenu.bookmark,
          ingredients: ingredients
            ? ingredients.join(',')
            : findMenu.ingredients,
        })
        .where({ id: menuId })
        .execute();

      const checkUpdateResult = await this.menusRepository.findOne(menuId);

      if (checkUpdateResult) {
        const patchMenuResDTO = new MenuDTO.PatchMenuResDTO();
        patchMenuResDTO.id = checkUpdateResult.id;
        patchMenuResDTO.createdAt = moment(checkUpdateResult.createdAt).format(
          'YYYY-MM-DDTHH:mm:ss',
        );
        patchMenuResDTO.updatedAt = moment(checkUpdateResult.updatedAt).format(
          'YYYY-MM-DDTHH:mm:ss',
        );
        patchMenuResDTO.title = checkUpdateResult.title;
        patchMenuResDTO.image = checkUpdateResult.image;
        patchMenuResDTO.bookmark = checkUpdateResult.bookmark;
        patchMenuResDTO.difficulty = checkUpdateResult.difficulty;
        patchMenuResDTO.ingredients = checkUpdateResult.ingredients.split(',');

        result.message = '';
        result.payload = patchMenuResDTO;
      } else {
        result.message = '[Error] Update Process Has Problem.';
        result.payload = null;
      }
    } else {
      result.message = '[Error] Menu Not Found.';
      result.payload = null;
    }

    result.code = HttpStatus.OK;
    return result;
  }
  async deleteMenu(menuId: string) {
    const result = new ModelDTO.ResponseDTO();

    const findMenu = await this.menusRepository.findOne(menuId);

    if (findMenu) {
      await this.menusRepository.delete(menuId);

      result.message = 'Delete Menu Success.';
    } else {
      result.message = '[Error] Menu Not Found.';
    }

    result.code = HttpStatus.OK;
    result.payload = null;

    return result;
  }
}

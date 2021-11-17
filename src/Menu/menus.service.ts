import { HttpStatus, Injectable } from '@nestjs/common';
import * as ModelDTO from '../dto/model.dto';
import * as MenuDTO from '../dto/menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu, Recipe } from 'src/entity';
import { Repository } from 'typeorm';

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

  async getMenus() {
    const result = new ModelDTO.ResponseDTO();

    return result;
  }
}

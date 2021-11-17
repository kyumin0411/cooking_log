import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { MenuDTO } from 'src/dto/model.dto';

export class PostMenuBodyDTO extends PickType(MenuDTO, [
  'title',
  'image',
  'difficulty',
  'ingredients',
]) {}

export class PostMenuResDTO extends PickType(MenuDTO, [
  'id',
  'createdAt',
  'updatedAt',
  'title',
  'image',
  'difficulty',
  'bookmark',
  'ingredients',
]) {}

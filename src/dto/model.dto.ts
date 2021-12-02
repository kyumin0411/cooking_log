import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO {
  @ApiProperty({ description: 'response code' })
  code: number = HttpStatus.OK;
  @ApiProperty({ description: 'response message' })
  message: string = '';
  payload?: any = null;
  constructor(code?: number, message?: string, payload?: any) {
    (this.code = code), (this.message = message), (this.payload = payload);
  }
}

export class MenuDTO {
  @ApiProperty({ description: '메뉴 아이디' })
  id: number;
  @ApiProperty({ description: '생성 날짜' })
  createdAt: string;
  @ApiProperty({ description: '수정 날짜' })
  updatedAt: string;
  @ApiProperty({ description: '요리 이름' })
  title: string;
  @ApiProperty({ description: '요리 대표 사진' })
  image: string;
  @ApiProperty({ description: '난이도 [ 1부터 5까지 ]', default: 1 })
  difficulty: number;
  @ApiProperty({ description: '즐겨찾기', default: false })
  bookmark: boolean;
  @ApiProperty({ description: '준비물' })
  ingredients: string[];
}

export class RecipeDTO {
  @ApiProperty({ description: '레시피 아이디' })
  id: number;
  @ApiProperty({ description: '레시피 글' })
  description: string;
  @ApiProperty({ description: '레시피 과정 사진' })
  image: string;
}
export class RecipesDTO {
  @ApiProperty({ description: '메뉴 아이디' })
  menuId: number;
  @ApiProperty({ description: '레시피 과정', type: RecipeDTO, isArray: true })
  recipes: RecipeDTO[];
}

export class UserDTO {
  @ApiProperty({ description: '유저 아이디' })
  userId: string;
  @ApiProperty({ description: '유저 이름' })
  userName: string;
  @ApiProperty({ description: '비밀번호' })
  password: string;
}

export class LoginDTO {
  @ApiProperty({ description: '유저 아이디' })
  userId: string;
  @ApiProperty({ description: '비밀번호' })
  password: string;
}

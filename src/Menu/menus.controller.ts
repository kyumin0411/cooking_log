import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MenuService } from './menus.service';
import * as MenuDTO from '../dto/menu.dto';

@ApiTags('Menus: 메뉴 데이터 관리')
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('/create')
  @ApiOperation({ summary: '메뉴 생성' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: '',
    description: '',
  })
  async postMenu(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: MenuDTO.PostMenuBodyDTO,
  ) {
    const result = await this.menuService.postMenu(body);
    res.status(result.code).json(result);
  }

  @Get()
  @ApiOperation({ summary: '메뉴 전체 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: '',
    description: '',
  })
  async getMenus(@Req() req: Request, @Res() res: Response) {
    const result = await this.menuService.getMenus();
    res.status(result.code).json(result);
  }
}

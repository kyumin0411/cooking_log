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
    type: MenuDTO.GetMenusResDTO,
    description: '',
  })
  async getMenus(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: MenuDTO.GetMenusReqDTO,
  ) {
    const result = await this.menuService.getMenus(query);
    res.status(result.code).json(result);
  }

  @Get('/:menuId')
  @ApiOperation({ summary: '메뉴 상세 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: MenuDTO.GetMenuResDTO,
    description: '',
  })
  @ApiParam({
    name: 'menuId',
    type: 'string',
    description: '조회할 메뉴 아이디',
  })
  async getMenu(
    @Req() req: Request,
    @Res() res: Response,
    @Param('menuId') menuId: string,
  ) {
    const result = await this.menuService.getMenu(menuId);
    res.status(result.code).json(result);
  }

  @Patch('/update/:menuId')
  @ApiOperation({ summary: '메뉴 수정' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: MenuDTO.PatchMenuResDTO,
    description: '',
  })
  @ApiParam({
    name: 'menuId',
    type: 'string',
    description: '수정할 메뉴 아이디',
  })
  async patchMenu(
    @Req() req: Request,
    @Res() res: Response,
    @Param('menuId') menuId: string,
    @Query() query: MenuDTO.PatchMenuReqDTO,
  ) {
    const result = await this.menuService.patchMenu(menuId, query);
    res.status(result.code).json(result);
  }

  @Delete('/delete/:menuId')
  @ApiOperation({ summary: '메뉴 삭제' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: '',
    description: '',
  })
  @ApiParam({
    name: 'menuId',
    type: 'string',
    description: '삭제할 메뉴 아이디',
  })
  async deleteMenu(
    @Req() req: Request,
    @Res() res: Response,
    @Param('menuId') menuId: string,
  ) {
    const result = await this.menuService.deleteMenu(menuId);
    res.status(result.code).json(result);
  }
}

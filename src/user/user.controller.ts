import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  Body,
  Get,
  Param,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import * as UserDTO from 'src/dto/user.dto';
import { Request, Response } from 'express';

@ApiTags('Users: 유저 데이터 관리')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '회원 가입' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDTO.PostUserResDTO,
    description: '',
  })
  async registerUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createUserDTO: UserDTO.PostUserBodyDTO,
  ) {
    const result = await this.userService.registerUser(createUserDTO);
    res.status(result.code).json(result);
  }

  @Get()
  @ApiOperation({ summary: '유저 전체 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDTO.GetUsersResDTO,
    description: '',
  })
  async getUsers(@Req() req: Request, @Res() res: Response) {
    const result = await this.userService.getUsers();
    res.status(result.code).json(result);
  }

  @Get('/:userId')
  @ApiOperation({ summary: '유저 단일 조회' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDTO.GetUserResDTO,
    description: '',
  })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: '조회할 유저 아이디',
  })
  async getUser(
    @Req() req: Request,
    @Res() res: Response,
    @Param('userId') userId: string,
  ) {
    const result = await this.userService.getUser(userId);
    res.status(result.code).json(result);
  }

  @Delete()
  @ApiOperation({ summary: '회원 탈퇴' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: '',
    description: '',
  })
  async deleteUser(@Req() req: Request, @Res() res: Response) {
    const result = await this.userService.deleteUser(req.headers.authorization);
    res.status(result.code).json(result);
  }

  @Put('/password')
  @ApiOperation({ summary: '비밀번호 변경' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: '',
    description: '',
  })
  @ApiQuery({
    name: 'password',
    type: 'string',
    description: '변경할 비밀번호',
  })
  async updatePassword(
    @Req() req: Request,
    @Res() res: Response,
    @Query('password') password: string,
  ) {
    console.log(password);
    const result = await this.userService.updatePassword(
      req.headers.authorization,
      password,
    );
    res.status(result.code).json(result);
  }
}

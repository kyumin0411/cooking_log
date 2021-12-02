import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import * as LoginDTO from 'src/dto/auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Login: 로그인 기능')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({ summary: '로그인' })
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() loginReqBodyDTO: LoginDTO.LoginReqBodyDTO,
  ) {
    const result = await this.authService.login(loginReqBodyDTO);
    res.status(result.code).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req: Request) {
    return 'if you need, fix me';
  }
}

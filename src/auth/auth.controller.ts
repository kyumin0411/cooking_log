import { Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('/login')
  // async login(@Req() req: Request, @Res() res: Response) {
  //   return this.authService.login(req.user);
  // }
}

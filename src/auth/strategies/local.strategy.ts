import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Strategy } from 'passport-local';
import { LoginDTO } from 'src/dto/model.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userId',
    });
  }

  async validate(userId: string, password: string) {
    let loginDTO: LoginDTO = {
      userId: userId,
      password: password,
    };

    const user = await this.authService.validateUser(loginDTO);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

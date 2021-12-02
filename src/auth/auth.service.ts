import { HttpStatus, Injectable } from '@nestjs/common';
import * as ModelDTO from 'src/dto/model.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    const result = new ModelDTO.ResponseDTO();

    const loginPayload = {
      userId: user.userId,
      userName: user.userName,
    };

    const accessToken = await this.jwtService.sign(loginPayload);

    result.code = HttpStatus.OK;
    result.message = '';
    return result;
  }
}

import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import * as ModelDTO from 'src/dto/model.dto';
import * as AuthDTO from 'src/dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginReqBodyDTO: AuthDTO.LoginReqBodyDTO) {
    const result = new ModelDTO.ResponseDTO();

    const loginPayload = {
      userId: loginReqBodyDTO.userId,
      userName: loginReqBodyDTO.password,
    };

    const accessToken = this.jwtService.sign(loginPayload);
    const loginResDTO = new AuthDTO.LoginResDTO();

    loginResDTO.accessToken = accessToken;

    result.code = HttpStatus.OK;
    result.message = '';
    result.payload = loginResDTO;
    return result;
  }

  async validateUser(loginDTO: ModelDTO.LoginDTO) {
    const user = await this.userRepository.findOne({ userId: loginDTO.userId });

    if (!user) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        message: '[Error] User Not Found.',
        error: 'Forbidden',
      });
    }
    const isMatch = await bcrypt.compare(loginDTO.password, user.password);

    if (isMatch) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        message: '[Error] Not Match.',
        error: 'Forbidden',
      });
    }
  }
}

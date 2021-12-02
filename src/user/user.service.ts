import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/entity';
import * as UserDTO from 'src/dto/user.dto';
import * as ModelDTO from 'src/dto/model.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async registerUser(postUserBodyDTO: UserDTO.PostUserBodyDTO) {
    const result = new ModelDTO.ResponseDTO();

    const { userId, userName, password } = postUserBodyDTO;

    const findUser = await this.userRepository.findOne(userId);

    if (findUser) {
      result.code = HttpStatus.FORBIDDEN;
      result.message = '[Error] Already Exists.';
      result.payload = null;
      return result;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.userRepository.create({
      userId: userId,
      userName: userName,
      password: hashPassword,
    });
    await this.userRepository.save(createdUser);

    const getUserResDTO = new UserDTO.GetUserResDTO();

    getUserResDTO.userId = userId;
    getUserResDTO.userName = userName;

    result.code = HttpStatus.OK;
    result.message = '';
    result.payload = getUserResDTO;
    return result;
  }

  async getUsers() {
    const result = new ModelDTO.ResponseDTO();

    const getUsersResDTO = new UserDTO.GetUsersResDTO();

    const userFindAndCount = await this.userRepository.findAndCount({
      select: ['userId', 'userName'],
    });
    getUsersResDTO.total = userFindAndCount[1];
    getUsersResDTO.users = userFindAndCount[0];

    result.code = HttpStatus.OK;
    result.message = '';
    result.payload = getUsersResDTO;
    return result;
  }

  async getUser(userId: string) {
    const result = new ModelDTO.ResponseDTO();

    const findUser = await this.userRepository.findOne(userId);

    if (findUser) {
      const getUserResDTO = new UserDTO.GetUserResDTO();
      getUserResDTO.userId = findUser.userId;
      getUserResDTO.userName = findUser.userName;

      result.message = '';
      result.payload = getUserResDTO;
    } else {
      result.message = '[Error] User Not Found.';
      result.payload = null;
    }

    result.code = HttpStatus.OK;
    return result;
  }
}

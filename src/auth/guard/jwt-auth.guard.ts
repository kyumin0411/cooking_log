import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (authorization === undefined) {
      throw new HttpException('Token Not Exist.', HttpStatus.UNAUTHORIZED);
    }
    const token = authorization.replace('Bearer ', '');
    request.user = this.validateToken(token);
    return true;
  }
  validateToken(token: string) {
    const secretKey = process.env.JWT_SECRET_KEY;
    try {
      const verify = this.jwtService.verify(token, { secret: secretKey });
      return verify;
    } catch (error) {
      switch (error.message) {
        case 'INVALID_TOKEN':
        case 'TOKEN_IS_ARRAY':
        case 'NO_USER':
          throw new HttpException('Token Not Valid.', 401);
        case 'EXPIRED_TOKEN':
          throw new HttpException('Token Expired.', 410);
        default:
          throw new HttpException('Server Error.', 500);
      }
    }
  }
}

import { JwtService } from '@nestjs/jwt';

interface AccessToken {
  /** 유저 아이디 */
  userId?: string;
  /** 유저 이름 */
  userName?: string;
  /** 생성 일자 */
  iat?: number;
}

const jwtService = new JwtService({});

export function decodeAccessToken(accessToken: string) {
  try {
    if (!accessToken) return null;

    const result: AccessToken | null | string = jwtService.decode(
      accessToken.replace('Bearer ', ''),
    );

    if (typeof result === 'string' || !result) {
      return null;
    }
    return result;
  } catch (error) {
    throw '[Error] Token Invalid.';
  }
}

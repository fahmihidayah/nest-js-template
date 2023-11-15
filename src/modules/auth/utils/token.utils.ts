import { User } from '@prisma/client';
import { REFRESH_SECRET_KEY, SECRET_KEY } from 'src/config';
import { sign } from 'jsonwebtoken';
import { ExecutionContext } from '@nestjs/common';
import { TokenSerializer } from '../entities/user.serializer';

export function getAuth(context: ExecutionContext): string | null {
  const header = context.switchToHttp().getRequest().header('Authorization');
  if (header) return header.split('Bearer ')[1];
  return null;
}

export function createToken(user: User): TokenSerializer {
  const dataStoredInToken = { id: user.id };
  const secretKey: string | undefined = SECRET_KEY;
  const refreshKey: string | undefined = REFRESH_SECRET_KEY;
  const expires_in: number = 30 * 24 * 60 * 60;

  return {
    expireIn: expires_in,
    accessToken: sign(dataStoredInToken, secretKey ?? 'test-1234', {
      expiresIn: expires_in,
    }),
    refreshToken: sign(dataStoredInToken, refreshKey ?? 'refresh-1234', {
      expiresIn: expires_in,
    }),
  };
}

export function renewToken(id: number): string {
  const dataStoredInToken = { id: id };
  const expires_in: number = 30 * 24 * 60 * 60;
  const secretKey: string | undefined = SECRET_KEY;
  return sign(dataStoredInToken, secretKey ?? 'test-1234', {
    expiresIn: expires_in,
  });
}

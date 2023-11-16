import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { TokenService } from './services/token.service';
import { RolesModule } from '../roles/roles.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports : [UsersModule, RolesModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService, AccessTokenStrategy, RefreshTokenStrategy]
})
export class AuthModule {}

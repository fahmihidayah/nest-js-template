import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { TokenService } from './services/token.service';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports : [UsersModule, RolesModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService]
})
export class AuthModule {}

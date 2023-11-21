import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';
import { DatabaseModule } from './db/db.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './modules/auth/constants';

@Module({
  imports: [
    DatabaseModule.forRoot(),
    JwtModule.register({
      global : true,
      secret : jwtConstants.secret,
      signOptions: {
        expiresIn : "60s"
      }
    }),
    ConfigModule.forRoot({
      envFilePath: '../.env.development.local',
    }),
    UsersModule, 
    AuthModule, 
    RolesModule
  ],
})
export class AppModule {}

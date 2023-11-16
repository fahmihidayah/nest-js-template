import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthFormDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { RegisterFormDto } from '../dto/register.dto';
import { ROLE_USER } from '../../roles/dto/role.dto';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { getUserWithTokenSerializer } from '../entities/user.serializer';
import { getUserSerializer } from 'src/modules/users/entities/user.serializer';

@Controller('auth')
export class AuthController {
  constructor(public _authService: AuthService) {}

  @Post('login')
  async login(@Body() authFormDto: AuthFormDto) {
    return this._authService.login(authFormDto);
  }

  @Post('sign-in')
  async signUp(@Body() authFormDto: AuthFormDto) {
    return await this._authService.signUp(authFormDto)
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return getUserSerializer(req.user)
  }

  @Post('register')
  async register(@Body() registerFormDto: RegisterFormDto) {
    return await this._authService.register(registerFormDto, ROLE_USER);
  }
}

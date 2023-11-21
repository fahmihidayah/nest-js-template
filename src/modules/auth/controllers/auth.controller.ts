import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthFormDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { RegisterFormDto } from '../dto/register.dto';
import { ROLE_USER } from '../../roles/dto/role.dto';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { getUserWithTokenSerializer } from '../entities/user.serializer';
import { getUserSerializer } from 'src/modules/users/entities/user.serializer';
import { formatResponse } from 'src/utils/response';

@Controller('auth')
export class AuthController {
  constructor(public _authService: AuthService) {}

  @Post('sign-in')
  async signUp(@Body() authFormDto: AuthFormDto) {
    const response = await this._authService.signUp(authFormDto)
    return formatResponse({
      message : "Success Login",
      data : response
    })
  }

  @Post("refresh-token")
  async refreshToken() {
    const token = await this._authService.refreshToken();
    return formatResponse({
      message : "Success refresh token",
      data : token
    })
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return formatResponse({
      message : "Success Login",
      data : getUserSerializer(req.user)
    })
  }

  @Post('register')
  async register(@Body() registerFormDto: RegisterFormDto) {
    const response = await this._authService.register(registerFormDto, ROLE_USER);
    return formatResponse({
      message : "Success Login",
      data : response
    })
  }
}

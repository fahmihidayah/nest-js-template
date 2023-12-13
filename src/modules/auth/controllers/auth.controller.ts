import { Body, Controller, Get, Headers, Post, Request, UseGuards } from '@nestjs/common';
import { AuthFormDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { RegisterFormDto } from '../dto/register.dto';
import { ROLE_USER } from '../../roles/dto/role.dto';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { getUserWithTokenSerializer } from '../entities/user.serializer';
import { getUserSerializer } from 'src/modules/users/entities/user.serializer';
import { formatResponse } from 'src/utils/response';
import { RefreshTokenDto } from '../dto/token.dto';

@Controller('auth')
export class AuthController {
  constructor(public _authService: AuthService) {}

  @Post('sign-in')
  async signUp(@Body() authFormDto: AuthFormDto) {
    console.log(authFormDto.email, authFormDto.password)
    if(!authFormDto.email) {
      throw new Error("Email and password is required")
    }
    const response = await this._authService.signUp(authFormDto)
    return formatResponse({
      message : "Success Login",
      data : response
    })
  }

  @Post("refresh-token")
  async refreshToken(@Body() refreshTokenDto : RefreshTokenDto) {
    const token = await this._authService.refreshToken(refreshTokenDto);
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

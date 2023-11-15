import { Body, Controller, Post } from '@nestjs/common';
import { AuthFormDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { RegisterFormDto } from '../dto/register.dto';
import { ROLE_USER } from '../../roles/dto/role.dto';

@Controller('auth')
export class AuthController {
  constructor(public _authService: AuthService) {}

  @Post('login')
  async login(@Body() authFormDto: AuthFormDto) {
    return this._authService.login(authFormDto);
  }

  @Post('sign-up')
  async signUp(@Body() authFormDto: AuthFormDto) {
    return await this._authService.signUp(authFormDto)
  }

  @Post('register')
  async register(@Body() registerFormDto: RegisterFormDto) {
    return await this._authService.register(registerFormDto, ROLE_USER);
  }
}

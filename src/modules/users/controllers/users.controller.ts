import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { getUserSerializer } from '../entities/user.serializer';
import { AuthOldGuard } from '../../auth/guards/auth.guard';
import { RoleGuard } from '../../roles/guards/role.guard';
import { ROLE_ADMIN, ROLE_USER } from '../../roles/dto/role.dto';
import { AccessTokenGuard } from 'src/modules/auth/guards/accessToken.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('admin')
  @UseGuards(AccessTokenGuard, new RoleGuard(ROLE_ADMIN))
  async admin(@Request() request) {
    return getUserSerializer(request.user);
  }

  @Get('profile')
  @UseGuards(AccessTokenGuard, new RoleGuard(ROLE_USER))
  async profile(@Request() request) {
    return getUserSerializer(request.user);
  }

  @Get()
  async findAll() {
    return (await this.usersService.findAll()).map((e) => getUserSerializer(e));
  }

  @Get(':id')
  @UseGuards(AuthOldGuard, new RoleGuard(ROLE_ADMIN))
  async findOne(@Param('id') id: string) {
    return getUserSerializer(await this.usersService.findOne(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

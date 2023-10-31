import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getUserSerializer } from './entities/user.serializer';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../roles/role.guard';
import { ROLE_ADMIN, ROLE_USER } from '../roles/dto/role.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get("admin")
  @UseGuards(AuthGuard, new RoleGuard(ROLE_ADMIN))
  async admin(@Request() request) {
    return getUserSerializer(request['user'])
  }

  @Get("profile")
  @UseGuards(AuthGuard, new RoleGuard(ROLE_USER))
  async profile(@Request() request) {
    return getUserSerializer(request['user'])
  }

  @Get()
  async findAll() {
    return (await  this.usersService.findAll()).map(e => getUserSerializer(e));
  }

  @Get(':id')
  @UseGuards(AuthGuard, new RoleGuard(ROLE_ADMIN))
  async findOne(@Param('id') id: string) {
    return getUserSerializer((await this.usersService.findOne(id)));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

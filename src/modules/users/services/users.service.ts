import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Prisma, PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { v4 as uuid4 } from 'uuid';
import { UserWithRoles } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private _userDelegate: Prisma.UserDelegate;

  constructor(prisma: PrismaClient) {
    this._userDelegate = prisma.user;
  }

  async createWithRole(createUserDto: CreateUserDto, role: Role) {
    return await this._userDelegate.create({
      data: {
        id: uuid4(),
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: await bcrypt.hash(createUserDto.password, 10),
        roles: {
          connect: role,
        },
      },
      include: {
        roles: true,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    return await this._userDelegate.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: await bcrypt.hash(createUserDto.password, 10),
      },
    });
  }

  async findAll() {
    return await this._userDelegate.findMany({
      include: {
        roles: true,
      },
    });
  }

  async findOne(id: string) {
    return await this._userDelegate.findUnique({
      where: {
        id: id,
      },
      include: {
        roles: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this._userDelegate.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await this._userDelegate.delete({
      where: {
        id: id,
      },
    });
  }

  async findByEmail(email: string): Promise<UserWithRoles> {
    return await this._userDelegate.findUnique({
      where: {
        email: email,
      },
      include: {
        roles: true,
      },
    });
  }
}

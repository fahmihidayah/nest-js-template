import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Prisma, PrismaClient, Role, User } from '@prisma/client';
// import * as argon2 from 'argon2';
import * as bcrypt from 'bcrypt';
import { v4 as uuid4 } from 'uuid';
import { UserWithRoles } from '../entities/user.entity';
import { CreateService, RetrieveService } from 'src/base/service';
import { Query } from 'src/utils/request';

@Injectable()
export class UsersService implements RetrieveService<UserWithRoles, string> {
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
      include: {
        roles : true
      }
    });
  }

  async findAll() {
    return await this._userDelegate.findMany({
      include: {
        roles: true,
      },
    });
  }

  async findByQuery(query: Query): Promise<UserWithRoles[]> {
    return await this._userDelegate.findMany({
      where : {

      },
      include : {
        roles : true
      }
    })
      
  }

  async findOne(id: string) : Promise<UserWithRoles> {
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
      include : {
        roles : true
      }
    });
  }

  async remove(id: string) {
    return await this._userDelegate.delete({
      where: {
        id: id,
      },
      include : {
        roles : true
      }
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

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, PrismaClient, Role, User } from '@prisma/client';
import * as bcrypt from "bcrypt";
import { UserWithRoles } from './entities/user.entity';
import prisma from 'src/db';

@Injectable()
export class UsersService {

  private _userDelegate : Prisma.UserDelegate;

  constructor(prisma : PrismaClient) {
    this._userDelegate = prisma.user
  }

  async createWithRole(createUserDto : CreateUserDto, role : Role) {
    return await this._userDelegate.create({
      data : {
        firstName : createUserDto.firstName,
        lastName : createUserDto.lastName,
        email : createUserDto.email,
        password : await bcrypt.hash(createUserDto.password, 10),
        roles : {
          connect : role
        }
      },
      include : {
        roles : true
      }
    })
  }

  async create(createUserDto: CreateUserDto) {
    return await this._userDelegate.create({
      data : {
        firstName : createUserDto.firstName,
        lastName : createUserDto.lastName,
        email : createUserDto.email,
        password : await bcrypt.hash(createUserDto.password, 10)
      }
    })
  }

  async findAll() {
    return await this._userDelegate.findMany({
      include : {
        roles : true
      }
    })
  }

  async findOne(id: string) {
    return await this._userDelegate.findUnique({
      where : {
        id : id
      },
      include : {
        roles : true
      }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email : string) : Promise<UserWithRoles> {
    return await this._userDelegate.findUnique({
      where : {
        email : email
      },
      include : {
        roles : true
      }
    })
  }
}

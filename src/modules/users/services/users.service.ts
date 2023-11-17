import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Prisma, PrismaClient, Role, User } from '@prisma/client';
// import * as argon2 from 'argon2';
import * as bcrypt from 'bcrypt';
import { v4 as uuid4 } from 'uuid';
import { UserWithRoles } from '../entities/user.entity';
import { CountService, CreateService, RemoveService, RetrieveService, UpdateService } from 'src/base/service';
import { Query, createQueryAction } from 'src/utils/request';
import { PaginateList } from 'src/utils/response';

@Injectable()
export class UsersService
  implements RetrieveService<UserWithRoles, string>, 
  UpdateService<string, UpdateUserDto, UserWithRoles>,
  RemoveService<string, UserWithRoles>,
  CountService {

  private _userDelegate: Prisma.UserDelegate;

  constructor(prisma: PrismaClient) {
    this._userDelegate = prisma.user;
  }


  private createWhereInput(query: Query): Prisma.UserWhereInput | undefined {
   
    const whereInputs: Prisma.UserWhereInput[] = []

    query.extraQueries.forEach((value, key) => {
      whereInputs.push({
        [String(key)]: {
          contains: value
        }
      })
    })
    const whereInput: Prisma.UserWhereInput | undefined = whereInputs.length > 0 ? {
      OR: whereInputs
    } : undefined
    return whereInput
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
        roles: true
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

  async findByQuery(query: Query): Promise<PaginateList<UserWithRoles[]>> {
    const queryAction = await createQueryAction(query, this);
    const result = await this._userDelegate.findMany({
      skip : queryAction.skip,
      take : queryAction.take,
      where: this.createWhereInput(query),
      include: {
        roles: true
      }
    })

    return {
      count : queryAction.count,
      data : result,
      page : query.page,
      totalPage : queryAction.totalPage
    }

  }

  async findOne(id: string): Promise<UserWithRoles> {
    return await this._userDelegate.findUnique({
      where: {
        id: id,
      },
      include: {
        roles: true,
      },
    });
  }

  async update(id: string, form: UpdateUserDto): Promise<UserWithRoles> {
    return await this._userDelegate.update({
      where: {
        id: id,
      },
      data: form,
      include: {
        roles: true
      }
    });
  }

  async remove(id: string): Promise<UserWithRoles> {
    return await this._userDelegate.delete({
      where: {
        id: id,
      },
      include: {
        roles: true
      }
    });
  }

  async count(): Promise<number> {
    return await this._userDelegate.count();
  }

  async countByQuery(query: Query): Promise<number> {
    return await this._userDelegate.count({
      where: {

      }
    })
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

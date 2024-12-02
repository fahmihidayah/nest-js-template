import { Injectable } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { UserCountArgs, UserCreateArgs, UserFindManyArgs, UserWithRoles } from "../entities/user.entity";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UserService {
    private _userDelegate: Prisma.UserDelegate;

	constructor(prisma: PrismaClient) {
		this._userDelegate = prisma.user;
	}

    async create(createArgs : UserCreateArgs) : Promise<UserWithRoles> {
        return await this._userDelegate.create(createArgs);
    }

    async findMany(find : UserFindManyArgs) : Promise<UserWithRoles[]> {
        return await this._userDelegate.findMany(find);
    }

    async findById(id : string) : Promise<UserWithRoles> {
        return await this._userDelegate.findUnique({
            where : {
                id : id
            },
            include : {
                roles : true
            }
        });
    }

    async findByEmail(email : string) : Promise<UserWithRoles> {
        return await this._userDelegate.findUnique({
            where : {
                email : email
            },
            include : {
                roles : true
            }
        });
    }

    async delete(id : string) : Promise<UserWithRoles> {
        return await this._userDelegate.delete({
            where : {
                id : id
            },
            include : {
                roles : true
            }
        });
    }
    
    async update(id : string, data : UpdateUserDto) : Promise<UserWithRoles> {
        return await this._userDelegate.update({
            where : {
                id : id
            },
            data : data,
            include : {
                roles : true
            }
        });
    }

    async count(findManyArgs: UserCountArgs) : Promise<number> {
        return await this._userDelegate.count(findManyArgs);
    }


}
import { Injectable } from "@nestjs/common";
import { Prisma, PrismaClient, User, UserToken } from "@prisma/client";
import { UserWithRoles } from "src/modules/users/entities/user.entity";

@Injectable()
export class TokenService { 

    private _userToken : Prisma.UserTokenDelegate

    constructor (
        prisma : PrismaClient
    ) {
        this._userToken = prisma.userToken
    }

    async findByUser(user : User) : Promise<UserToken> {
        return await this._userToken.findUnique({
            where : {
                user_id : user.id
            }
        })
    }

    async create(user: UserWithRoles, token : string) : Promise<UserToken> {
        return await this._userToken.create({
            data : {
                user : {
                    connect : {
                        id : user.id
                    }
                },
                token : token
            }
        })
    }

    async update(user: UserWithRoles, token : string) : Promise<UserToken> {
        return await this._userToken.update({
            where : {
                user_id : user.id
            },
            data : {
                token : token
            }
        })
    }
}
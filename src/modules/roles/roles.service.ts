import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Role } from '@prisma/client';
import prisma from 'src/db';
import { RoleFormDto } from './dto/role.dto';

@Injectable()
export class RolesService {

    private _roleDelegate : Prisma.RoleDelegate;

    constructor(prisma : PrismaClient) {
        this._roleDelegate = prisma.role
    }

    async findAll() : Promise<Role[]> {
        return await this._roleDelegate.findMany()
    }

    async findAndCreate(roleFormDto : RoleFormDto) : Promise<Role> {
        const role = await this._roleDelegate.findFirst({
            where : {
                name : roleFormDto.name
            }
        })
        if(role) {
            return role;
        }
        return await this._roleDelegate.create({
            data : roleFormDto
        })
    }



}

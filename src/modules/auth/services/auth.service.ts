import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { AuthFormDto } from '../dto/auth.dto';
import { RegisterFormDto } from '../dto/register.dto';
import { compare, hash } from 'bcrypt';
import { createToken } from '../utils/token.utils';
import { TokenService } from './token.service';
import { UserWithTokenSerializer, getUserWithTokenSerializer } from '../entities/user.serializer';
import { UserWithRoles } from 'src/modules/users/entities/user.entity';
import { getUserSerializer } from 'src/modules/users/entities/user.serializer';
import { RolesService } from 'src/modules/roles/roles.service';
import { ROLE_USER } from 'src/modules/roles/dto/role.dto';

@Injectable()
export class AuthService {
    constructor(private _usersService : UsersService,
        private tokenService : TokenService,
        private rolesService : RolesService) {

    }


    async login(authFormDto : AuthFormDto) : Promise<UserWithTokenSerializer> {
        const user = await this._usersService.findByEmail(authFormDto.email)
        if(!user) {
            throw new HttpException(`User with email ${authFormDto.email} not found`, 409)
        }

        const isPasswordMatching: boolean = await compare(authFormDto.password, user.password);
        if (!isPasswordMatching) throw new HttpException("Password is not match", 409);

        const tokenData = await createToken(user);
        // const cookie = this.createCookie(tokenData);
        const userToken = await this.tokenService.findByUser(user);
        if (userToken === null) {
            await this.tokenService.create(user, tokenData.refreshToken);
        }
        else {
            await this.tokenService.update(user, tokenData.refreshToken);
        }
        return getUserWithTokenSerializer(user, tokenData);
    }

    async register(registerFormDto : RegisterFormDto, roleName : string = ROLE_USER) {
        const user = await this._usersService.findByEmail(registerFormDto.email);
        if(user) {
            throw new HttpException(`This email ${registerFormDto.email} already used`, 409);
        }

        const role = await this.rolesService.findAndCreate({name : roleName});

        const newUser = await this._usersService.createWithRole(registerFormDto, role)

        return getUserSerializer(newUser)
    }

}

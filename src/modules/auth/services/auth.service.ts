import { HttpException, Injectable } from "@nestjs/common";
import { AuthFormDto } from "../dto/auth.dto";
import { RegisterFormDto } from "../dto/register.dto";
import { compare, hash } from "bcrypt";
import { UserWithTokenSerializer } from "../entities/user.serializer";
import { getUserSerializer } from "src/modules/users/entities/user.serializer";
import { RolesService } from "src/modules/roles/services/roles.service";
import { ROLE_USER } from "src/modules/roles/dto/role.dto";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../constants";
import { RefreshTokenDto } from "../dto/token.dto";
import { UserService } from "../../../modules/users/services/user.service";
import { v4 as uuid4 } from "uuid";

@Injectable()
export class AuthService {
	constructor(
		private _usersService: UserService,
		private rolesService: RolesService,
		private _jwtService: JwtService,
	) {}

	async signUp(authFormDto: AuthFormDto): Promise<UserWithTokenSerializer> {
		const user = await this._usersService.findByEmail(authFormDto.email);
		if (!user) {
			throw new HttpException(
				`User with email ${authFormDto.email} not found`,
				409,
			);
		}

		const isPasswordMatching: boolean = await compare(
			authFormDto.password,
			user.password,
		);
		if (!isPasswordMatching)
			throw new HttpException("Password is not match", 409);

		const accessToken = await this._jwtService.signAsync({
			sub: user.id,
			email: user.email,
		});
		const refreshToken = await this._jwtService.signAsync(
			{ sub: user.id, email: user.email },
			{ secret: jwtConstants.secret, expiresIn: "30d" },
		);

		return {
			...getUserSerializer(user),
			token: {
				accessToken: accessToken,
				refreshToken: refreshToken,
				expireIn: 30 * 24 * 60 * 60,
			},
		};
	}

	async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<string> {
		const tokenWithUser = await this._jwtService.verifyAsync(
			refreshTokenDto.refreshToken,
		);
		const accessToken = await this._jwtService.signAsync({
			sub: tokenWithUser.user.id,
			email: tokenWithUser.user.email,
		});
		return accessToken;
	}

	async register(
		registerFormDto: RegisterFormDto,
		roleName: string = ROLE_USER,
	) {
		const user = await this._usersService.findByEmail(registerFormDto.email);
		if (user) {
			throw new HttpException(
				`This email ${registerFormDto.email} already used`,
				409,
			);
		}

		const role = await this.rolesService.findAndCreate({ name: roleName });

		// const newUser = await this._usersService.createWithRole(
		// 	registerFormDto,
		// 	role,
		// );

		const newUser = await this._usersService.create({
			data: {
				id: uuid4(),
				firstName: registerFormDto.firstName,
				lastName: registerFormDto.lastName,
				email: registerFormDto.email,
				password: await hash(registerFormDto.password, 10),
				roles: {
					connect: {
						id: role.id,
					},
				},},
				include: {
					roles: true,
				}
			
		});

		return getUserSerializer(newUser);
	}
}

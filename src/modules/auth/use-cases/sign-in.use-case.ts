import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { UserService } from "src/modules/users/services/user.service";
import { jwtConstants } from "../constants";
import { getUserSerializer } from "src/modules/users/entities/user.serializer";
import { AuthFormDto } from "../dto/auth.dto";

@Injectable()
export class SignInUseCase {
	constructor(
		private readonly _userService: UserService,
		private readonly _jwtService: JwtService,
	) {}

	async execute({ email, password }: AuthFormDto) {
		const user = await this._userService.findByEmail(email);
		if (!user) {
			throw new HttpException(`User with email ${email} not found`, 409);
		}

		const isPasswordMatching: boolean = await compare(password, user.password);
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
}

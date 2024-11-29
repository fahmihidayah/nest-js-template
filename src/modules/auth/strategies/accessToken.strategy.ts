import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { jwtConstants } from "../constants";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/modules/users/services/users.service";
import { User } from "@prisma/client";

type JwtPayload = {
	sub: string;
	email: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(private _userService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConstants.secret,
		});
	}

	async validate(payload: JwtPayload): Promise<User> {
		const user = await this._userService.findOne(payload.sub);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}

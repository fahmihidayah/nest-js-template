import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { jwtConstants } from "../constants";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "@prisma/client";
import { UserService } from "src/modules/users/services/user.service";

type JwtPayload = {
	sub: string;
	email: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(private _userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConstants.secret,
		});
	}

	async validate(payload: JwtPayload): Promise<User> {
		const user = await this._userService.findById(payload.sub);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}

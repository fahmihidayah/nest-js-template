import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtPayload, verify } from "jsonwebtoken";
import { SECRET_KEY } from "src/config";
import { getAuth } from "../utils/token.utils";
import { UserService } from "../../../modules/users/services/user.service";

@Injectable()
export class AuthOldGuard implements CanActivate {
	constructor(private readonly userService: UserService) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const token = getAuth(context);
		if (!token) {
			throw new UnauthorizedException();
		}
		const { id } = (await verify(
			token,
			SECRET_KEY ?? "test-1234",
		)) as JwtPayload;
		const user = await this.userService.findById(id);
		const request = context.switchToHttp().getRequest();
		request["user"] = user;
		return true;
	}
}

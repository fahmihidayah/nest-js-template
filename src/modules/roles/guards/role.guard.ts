import {
	CanActivate,
	ExecutionContext,
	HttpException,
	Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private role: string) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const response = context.switchToHttp().getRequest();
		const user = response["user"];
		if (user) {
			if (user.roles.some((e) => e.name === this.role)) {
				return true;
			} else {
				throw new HttpException(
					`You don't have any authorization to access this resource`,
					409,
				);
			}
		} else {
			throw new HttpException(`Your authentication is invalid`, 409);
		}
	}
}

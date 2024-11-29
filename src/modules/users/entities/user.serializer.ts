import { User } from "@prisma/client";
import { UserWithRoles } from "./user.entity";

export class UserSerializer {
	public id: string;
	public firstName: string;
	public lastName: string;
	public email: string;
	public roles: string[] | null | undefined;
	public createdAt: Date;
	public updatedAt: Date;
}

export function getUserSerializer(user: UserWithRoles): UserSerializer {
	return {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		roles: user.roles.map((e) => e.name),
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	};
}

import { IsNotEmpty, MinLength } from "class-validator";

export const ROLE_ADMIN = "admin";
export const ROLE_USER = "user";

export class RoleFormDto {
	@MinLength(3)
	public name: string;
}

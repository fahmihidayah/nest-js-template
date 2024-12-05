import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/modules/users/services/user.service";
import { RegisterFormDto } from "../dto/register.dto";
import { RolesService } from "src/modules/roles/services/roles.service";
import { v4 as uuid4 } from "uuid";
import { hash } from "bcrypt";
import { getUserSerializer } from "src/modules/users/entities/user.serializer";

@Injectable()
export class SignUpUseCase {
	constructor(
		private readonly _userService: UserService,
		private readonly _roleService: RolesService,
	) {}

	async execute(form: RegisterFormDto, roleName: string) {
		const user = await this._userService.findByEmail(form.email);
		if (user) {
			throw new HttpException(`This email ${form.email} already used`, 409);
		}

		const role = await this._roleService.findAndCreate({ name: roleName });

		const newUser = await this._userService.create({
			data: {
				email: form.email,
				firstName: form.firstName,
				lastName: form.lastName,
				password: await hash(form.password, 10),
				roles: {
					connect: {
						id: role.id,
					},
				},
			},
			include: {
				roles: true,
			},
		});

		return getUserSerializer(newUser);
	}
}

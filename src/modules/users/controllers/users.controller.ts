import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Request,
	UseGuards,
	Query,
} from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { getUserSerializer } from "../entities/user.serializer";
import { RoleGuard } from "../../roles/guards/role.guard";
import { ROLE_ADMIN, ROLE_USER } from "../../roles/dto/role.dto";
import { AccessTokenGuard } from "src/modules/auth/guards/accessToken.guard";
import { formatResponse } from "src/utils/response";
import { FindAllUserUseCase } from "../use-cases/find-all-users.use-case";
import { BaseQuery } from "src/utils/query/data";
import { CreateUserUseCase } from "../use-cases/create-user.use-case";
import { UpdateUserUseCase } from "../use-cases/update-user.use-case";
import { DeleteUserUseCase } from "../use-cases/delete-user.use-case";
import { FindUserByIdUseCase } from "../use-cases/find-user-by-id.use-case";

@Controller("users")
export class UsersController {
	constructor(
		private readonly findAllUserUseCase: FindAllUserUseCase,
		private readonly createUserUseCase: CreateUserUseCase,
		private readonly updateUserUseCase: UpdateUserUseCase,
		private readonly deleteUserUseCase: DeleteUserUseCase,
		private readonly findByIdUserUseCase: FindUserByIdUseCase,
	) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		return formatResponse({
			message: "Success Create User",
			data: getUserSerializer(
				await this.createUserUseCase.execute(createUserDto),
			),
		});
	}

	@Get("admin")
	@UseGuards(AccessTokenGuard, new RoleGuard(ROLE_ADMIN))
	async admin(@Request() request) {
		return formatResponse({
			message: "Success Retrieve",
			data: getUserSerializer(request.user),
		});
	}

	@Get("profile")
	@UseGuards(AccessTokenGuard, new RoleGuard(ROLE_USER))
	async profile(@Request() request) {
		return formatResponse({
			message: "Success Retrieve",
			data: getUserSerializer(request.user),
		});
	}

	@Get()
	async findAll(@Query() query: BaseQuery) {
		const users = await this.findAllUserUseCase.execute(query);

		return formatResponse({
			message: "Success Retrieve",
			data: users.map((user) => getUserSerializer(user)),
		});
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		return formatResponse({
			message: "Success Retrieve",
			data: getUserSerializer(await this.findByIdUserUseCase.execute(id)),
		});
	}

	@Patch(":id")
	async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		return formatResponse({
			data: getUserSerializer(
				await this.updateUserUseCase.execute(id, updateUserDto),
			),
		});
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		return formatResponse({
			data: getUserSerializer(await this.deleteUserUseCase.execute(id)),
		});
	}
}

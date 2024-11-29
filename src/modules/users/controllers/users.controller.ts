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
} from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { getUserSerializer } from "../entities/user.serializer";
import { AuthOldGuard } from "../../auth/guards/auth.guard";
import { RoleGuard } from "../../roles/guards/role.guard";
import { ROLE_ADMIN, ROLE_USER } from "../../roles/dto/role.dto";
import { AccessTokenGuard } from "src/modules/auth/guards/accessToken.guard";
import { formatResponse } from "src/utils/response";
import * as express from "express";
import { getQuery } from "src/utils/request";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		return formatResponse({
			message: "Success Create User",
			data: getUserSerializer(await this.usersService.create(createUserDto)),
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
	async findAll(@Request() request: express.Request) {
		const query = request.query;
		console.log(query);
		const paginageList = await this.usersService.findByQuery(getQuery(request));

		return formatResponse({
			message: "Success Retrieve",
			data: {
				...paginageList,
				data: paginageList.data.map((e) => getUserSerializer(e)),
			},
			extractData: true,
		});
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		return formatResponse({
			message: "Success Retrieve",
			data: getUserSerializer(await this.usersService.findOne(id)),
		});
	}

	@Patch(":id")
	async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		return formatResponse({
			data: getUserSerializer(
				await this.usersService.update(id, updateUserDto),
			),
		});
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		return formatResponse({
			data: getUserSerializer(await this.usersService.remove(id)),
		});
	}
}

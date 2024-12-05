import { Injectable } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserWithRoles } from "../entities/user.entity";
import { getFindManyArgs } from "src/utils/query";
import { UserFindManyArgs } from "../libs/prisma-args";
import { BaseQuery } from "src/utils/query/data";

@Injectable()
export class FindAllUserUseCase {
	private userRepository: UserService;

	constructor(userRepository: UserService) {
		this.userRepository = userRepository;
	}

	async execute(query: BaseQuery): Promise<UserWithRoles[]> {
		const findManyArgs = getFindManyArgs(query) as UserFindManyArgs;
		return await this.userRepository.findMany(findManyArgs);
	}
}

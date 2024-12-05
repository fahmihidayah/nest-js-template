import { Injectable } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserWithRoles } from "../entities/user.entity";

@Injectable()
export class DeleteUserUseCase {
	constructor(private readonly userRepository: UserService) {}

	async execute(id: string): Promise<UserWithRoles> {
		return await this.userRepository.delete(id);
	}
}

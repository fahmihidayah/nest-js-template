import { Module } from "@nestjs/common";
import { UsersController } from "./controllers/users.controller";
import { UserService } from "./services/user.service";
import { FindAllUserUseCase } from "./use-cases/find-all-users.use-case";
import { CreateUserUseCase } from "./use-cases/create-user.use-case";
import { UpdateUserUseCase } from "./use-cases/update-user.use-case";
import { FindUserByIdUseCase } from "./use-cases/find-user-by-id.use-case";
import { DeleteUserUseCase } from "./use-cases/delete-user.use-case";
import { FindUsersWithPaginateUseCase } from "./use-cases/find-users-with-paginate.use-case";
import { CountUserUseCase } from "./use-cases/count-user.use-case";

@Module({
	controllers: [UsersController],
	providers: [UserService,
		UserService,
		FindAllUserUseCase,
		FindUsersWithPaginateUseCase,
		CountUserUseCase, CreateUserUseCase, UpdateUserUseCase, FindUserByIdUseCase, DeleteUserUseCase],
	exports: [UserService],
})
export class UsersModule { }

import { BaseQuery } from "src/base/data";
import { PaginateList } from "src/utils/response";
import { UserFindManyArgs, UserWithRoles } from "../entities/user.entity";
import { UserService } from "../services/user.service";
import { FindAllUserUseCase } from "./find-all-users.use-case";
import { CountUserUseCase } from "./count-user.use-case";
import { Injectable } from "@nestjs/common";
import { getFindManyArgs } from "src/utils/query";

@Injectable()
export class FindUsersWithPaginateUseCase {

    constructor(private readonly findAllUserUseCase : FindAllUserUseCase,
        private readonly countUserUseCase: CountUserUseCase) {
    }

    async execute(query: BaseQuery): Promise<PaginateList<UserWithRoles[]>> {
        
        const users = await this.findAllUserUseCase.execute(query);
        const total = await this.countUserUseCase.execute(query);
        return {
            data: users,
            count: total,
            page: query.page,
            totalPage: Math.ceil(total / query.pageSize),
        }
    }
}

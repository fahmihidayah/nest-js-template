import { Injectable } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserFindManyArgs, UserWithRoles } from "../entities/user.entity";
import { BaseQuery } from "src/base/data";
import { getFindManyArgs } from "src/utils/query";

@Injectable()
export class FindAllUserUseCase {
    private userRepository : UserService;

    constructor(userRepository : UserService) {
        this.userRepository = userRepository;
    }

    async execute(query: BaseQuery): Promise<UserWithRoles[]> {
        const findManyArgs = getFindManyArgs(query) as UserFindManyArgs;
        return await this.userRepository.findMany(findManyArgs);
    }
    
}
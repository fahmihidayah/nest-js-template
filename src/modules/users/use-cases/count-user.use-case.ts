import { Injectable } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { BaseQuery } from "src/base/data";
import { skip } from "node:test";
import { getFindManyArgs } from "src/utils/query";

@Injectable()
export class CountUserUseCase {

    constructor(private readonly userRepository: UserService) {
        
    }

    async execute(query: BaseQuery): Promise<number> {
        const findManyArgs = getFindManyArgs(query);
        return await this.userRepository.count({
            where: findManyArgs.where,
            skip: findManyArgs.skip,
            take: findManyArgs.take,
        })
    }
}
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserWithRoles } from "../entities/user.entity";
import { UserService } from "../services/user.service";
import * as bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";

@Injectable()
export class CreateUserUseCase {
    constructor(private readonly userRepository: UserService) {}

    async execute(createUserDto: CreateUserDto): Promise<UserWithRoles> {
        const user = await this.userRepository.create({
            data : {
                id : uuid4(),
                ... createUserDto,
                password :  await bcrypt.hash(createUserDto.password, 10),
            },
            include : {
                roles : true
            }
        });

        return user;
    }
}
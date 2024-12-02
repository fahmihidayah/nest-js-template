import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserWithRoles } from "../entities/user.entity";
import { UserService } from "../services/user.service";

@Injectable()
export class UpdateUserUseCase {
    constructor(private readonly userRepository: UserService) {}

    async execute(id: string, data: UpdateUserDto): Promise<UserWithRoles> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.userRepository.update(id, data);
    }
}
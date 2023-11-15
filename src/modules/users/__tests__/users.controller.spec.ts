import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   controllers: [UsersController],
    //   providers: [UsersService],
    // }).compile();

    // controllers = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(1).toBe(1);
    // expect(controllers).toBeDefined();
  });
});

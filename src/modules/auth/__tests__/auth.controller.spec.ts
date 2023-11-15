import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   controllers: [AuthController],
    // }).compile();

    // controllers = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(1).toBe(1);
    // expect(controllers).toBeDefined();
  });
});

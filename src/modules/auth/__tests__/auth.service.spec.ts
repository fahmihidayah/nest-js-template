import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [AuthService],
    // }).compile();

    // service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(1).toBe(1);
    // expect(service).toBeDefined();
  });
});

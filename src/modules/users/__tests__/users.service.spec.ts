import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { Context, MockContext, createMockContext } from 'src/db/test-mock';
import { Prisma, PrismaClient } from '@prisma/client';

let mockCtx: MockContext
let ctx: Context

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {

    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide : PrismaClient,
        useValue : ctx.prisma
      }],
    }).overrideProvider(UsersService).useValue({}).
      compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {

    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleRepository } from './user-role-repository';

describe('UserRoleRepository', () => {
  let provider: UserRoleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRoleRepository],
    }).compile();

    provider = module.get<UserRoleRepository>(UserRoleRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

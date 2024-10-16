import { Test, TestingModule } from '@nestjs/testing';
import { DomainRepository } from './domain-repository';

describe('DomainRepository', () => {
  let provider: DomainRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainRepository],
    }).compile();

    provider = module.get<DomainRepository>(DomainRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

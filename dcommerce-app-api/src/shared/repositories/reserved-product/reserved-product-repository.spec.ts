import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryRepository } from './cart-item-repository';

describe('ProductCategoryRepository', () => {
  let provider: ProductCategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCategoryRepository],
    }).compile();

    provider = module.get<ProductCategoryRepository>(ProductCategoryRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

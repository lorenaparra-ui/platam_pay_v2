import { Test, TestingModule } from '@nestjs/testing';
import { ProductsDataService } from './products-data.service';

describe('ProductsDataService', () => {
  let service: ProductsDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsDataService],
    }).compile();

    service = module.get<ProductsDataService>(ProductsDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

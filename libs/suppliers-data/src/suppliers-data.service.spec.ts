import { Test, TestingModule } from '@nestjs/testing';
import { SuppliersDataService } from './suppliers-data.service';

describe('SuppliersDataService', () => {
  let service: SuppliersDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuppliersDataService],
    }).compile();

    service = module.get<SuppliersDataService>(SuppliersDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

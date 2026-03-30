import { Test, TestingModule } from '@nestjs/testing';
import { TransversalDataService } from './transversal-data.service';

describe('TransversalDataService', () => {
  let service: TransversalDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransversalDataService],
    }).compile();

    service = module.get<TransversalDataService>(TransversalDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TowelsService } from './towels.service';

describe('TowelsService', () => {
  let service: TowelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TowelsService],
    }).compile();

    service = module.get<TowelsService>(TowelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

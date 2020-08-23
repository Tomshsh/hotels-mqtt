import { Test, TestingModule } from '@nestjs/testing';
import { MaintanenceService } from './maintanence.service';

describe('MaintanenceService', () => {
  let service: MaintanenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintanenceService],
    }).compile();

    service = module.get<MaintanenceService>(MaintanenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { MinibarsService } from './minibars.service';

describe('MinibarsService', () => {
  let service: MinibarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinibarsService],
    }).compile();

    service = module.get<MinibarsService>(MinibarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

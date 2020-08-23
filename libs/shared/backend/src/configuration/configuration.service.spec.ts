import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationServiceService } from './configuration.service';

describe('ConfigurationServiceService', () => {
  let service: ConfigurationServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigurationServiceService],
    }).compile();

    service = module.get<ConfigurationServiceService>(ConfigurationServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

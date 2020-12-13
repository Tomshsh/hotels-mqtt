import { Test, TestingModule } from '@nestjs/testing';
import { StaffAlertService } from './staff-alert.service';

describe('StaffAlertService', () => {
  let service: StaffAlertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffAlertService],
    }).compile();

    service = module.get<StaffAlertService>(StaffAlertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { TestBed } from '@angular/core/testing';
import { TrayStateService } from './tray-state.service';

describe('TrayStateService', () => {
  let service: TrayStateService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrayStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

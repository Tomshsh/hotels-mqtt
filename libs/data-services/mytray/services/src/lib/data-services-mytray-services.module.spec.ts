import { async, TestBed } from '@angular/core/testing';
import { DataServicesMytrayServicesModule } from './data-services-mytray-services.module';

describe('DataServicesMytrayServicesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataServicesMytrayServicesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataServicesMytrayServicesModule).toBeDefined();
  });
});

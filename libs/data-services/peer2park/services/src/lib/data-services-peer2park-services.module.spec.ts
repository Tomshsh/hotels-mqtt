import { async, TestBed } from '@angular/core/testing';
import { DataServicesPeer2parkServicesModule } from './data-services-peer2park-services.module';

describe('DataServicesPeer2parkServicesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataServicesPeer2parkServicesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataServicesPeer2parkServicesModule).toBeDefined();
  });
});

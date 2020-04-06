import { async, TestBed } from '@angular/core/testing';
import { SharedUtilitiesModule } from './shared-utilities.module';

describe('SharedUtilitiesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUtilitiesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUtilitiesModule).toBeDefined();
  });
});

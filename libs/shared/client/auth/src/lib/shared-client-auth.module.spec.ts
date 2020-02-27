import { async, TestBed } from '@angular/core/testing';
import { SharedClientAuthModule } from './shared-client-auth.module';

describe('SharedClientAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedClientAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedClientAuthModule).toBeDefined();
  });
});

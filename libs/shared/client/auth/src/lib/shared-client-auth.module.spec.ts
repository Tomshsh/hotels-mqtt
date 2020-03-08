import { async, TestBed } from '@angular/core/testing';
import { SharedClientAuthModule } from './shared-client-auth.module';
import { NbAuthModule } from '@nebular/auth';

describe('SharedClientAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NbAuthModule.forRoot(), SharedClientAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedClientAuthModule).toBeDefined();
  });
});

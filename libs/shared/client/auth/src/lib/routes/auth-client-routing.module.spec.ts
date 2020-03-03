import { async, TestBed } from '@angular/core/testing';
import { AuthClientRoutingModule } from './auth-client-routing.module';
import { NbAuthModule } from "@nebular/auth";
import { ContainersModule } from "../containers/containers.module";

describe('AuthClientRoutingModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NbAuthModule.forRoot(), ContainersModule, AuthClientRoutingModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AuthClientRoutingModule).toBeDefined();
  });
});

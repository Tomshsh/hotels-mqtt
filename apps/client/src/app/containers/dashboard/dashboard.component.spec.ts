import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';


describe('Dashboard', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have <router-outlet> in template', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    expect(fixture.debugElement.query(el => !el.query(By.css('router-outlet'))).name)
      .toEqual('router-outlet');
  });
});

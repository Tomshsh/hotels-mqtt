import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContainerComponent, SidebarContainerComponent } from '@my-tray/shared/layout';
import { NbLayoutModule, NbSidebarModule, NbThemeModule, NbThemeService } from '@nebular/theme';
import { RouterModule } from '@angular/router';

describe('DashboardContainerComponent', () => {
  let component: DashboardContainerComponent;
  let fixture: ComponentFixture<DashboardContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NbLayoutModule, NbSidebarModule, NbThemeModule, RouterModule],
      declarations: [DashboardContainerComponent, SidebarContainerComponent],
      providers: [NbThemeService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { AuthSessionService } from '@my-tray/shared/client/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardContainerComponent implements OnInit {
  constructor(private readonly sidebarService: NbSidebarService,
              private readonly authService: AuthSessionService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.sidebarService.toggle(true, 'left');
  }


  logOut() {
    this.authService.logOut();
    this.router.navigate(['auth/login']);
  }

}

import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RoutesService } from '@my-tray/data-services/mytray/services';
import { AppNavItem } from '@my-tray/api-interfaces';
import { AuthSessionService } from '@my-tray/shared/client/auth';
import { Router } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ui-sidebar-content',
  templateUrl: './sidebar-container.component.html',
  styleUrls: ['./sidebar-container.component.scss'],
})
export class SidebarContainerComponent implements OnInit {
  @Input()
  items: NbMenuItem[] = [];

  constructor() {
  }

  ngOnInit(): void {

  }


}

import { Component, Input, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ui-sidebar-content',
  templateUrl: './sidebar-container.component.html',
  styleUrls: ['./sidebar-container.component.scss'],
})
export class SidebarContainerComponent implements OnInit {
  @Input()
  items: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'keypad-outline',
      link: 'dashboard'
    },
    {
      title: 'Profile',
      icon: 'person-outline',
      link: '/'
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
      link: 'logout'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}

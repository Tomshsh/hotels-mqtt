import { Component, Input, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ui-sidebar-content',
  templateUrl: './sidebar-container.component.html',
  styleUrls: ['./sidebar-container.component.scss'],
})
export class SidebarContainerComponent implements OnInit {
  @Input()
  items = [
    {
      title: 'Users',
      icon: 'keypad-outline',
      link: 'users'
    },
    {
      title: 'Operations',
      icon: 'person-outline',
      link: 'operation'
    },
    {
      title: 'Reception View',
      icon: 'unlock-outline',
      link: 'reception'
    },
    {
      title: 'Devices',
      icon: 'keypad-outline',
      link: 'devices'
    },
    {
      title: 'Profile',
      expanded: false,
      icon: 'keypad-outline',
      children: [
        {
          title: 'Change Password',
          link: [], // goes into angular `routerLink`
        },
        {
          title: 'Privacy Policy',
          url: '#', // goes directly into `href` attribute
        },
        {
          title: 'Logout',
          link: [],
        },
      ],
    },
  ];
  constructor() {
  }

  ngOnInit(): void {
  }

}

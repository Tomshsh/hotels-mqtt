import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RoutesService } from '@my-tray/data-services/mytray/services';
import { AppNavItem } from '@my-tray/api-interfaces';

@Component({
  selector: 'ui-sidebar-content',
  templateUrl: './sidebar-container.component.html',
  styleUrls: ['./sidebar-container.component.scss'],
})
export class SidebarContainerComponent implements OnInit {
  @Input()
  items: any[] = [];

  /*items = [
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
  ];*/
  constructor(private readonly routesService: RoutesService,
              private readonly cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.routesService.getRoutesForLayout().subscribe((routes: AppNavItem[]) => {
      routes.map((route: AppNavItem) => {
        if (route) {
          this.items.push({
            title: route.title,
            icon: route.icon,
            link: route.link,
            expanded: route.expanded,
            children: route.children
          });
        }
      });

      this.items.push({
        title: 'Logout',
        icon: 'log-out-outline',
        link: ['/auth/logout'],
      });
      setTimeout(() => {
        this.cd.detectChanges();
      });
    });
  }

}

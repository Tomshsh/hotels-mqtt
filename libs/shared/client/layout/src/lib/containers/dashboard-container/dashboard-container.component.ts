import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuBag, NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { RoutingComponent } from '@my-tray/shared/utilities';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoutesService } from '@my-tray/data-services/mytray/services';
import { AclDto, AppNavItem } from '@my-tray/api-interfaces';
import { AuthSessionQuery, AuthSessionService } from '@my-tray/shared/client/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@RoutingComponent()
export class DashboardContainerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  headerTitle: string;
  items: NbMenuItem[] = [];

  constructor(private readonly sidebarService: NbSidebarService,
              private readonly authService: AuthSessionService,
              private readonly authQuery: AuthSessionQuery,
              private readonly menuService: NbMenuService,
              private readonly routesService: RoutesService,
              private readonly cd: ChangeDetectorRef,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.menuService.onItemClick()
      .pipe(takeUntil(this.destroy$))
      .subscribe((menuBag: NbMenuBag) => {
        this.resetSelection(this.items);
        menuBag.item.selected = true;
      });

    this.authQuery.loggedInACL$
      .pipe(takeUntil(this.destroy$))
      .subscribe((acl: AclDto) => {
        this.headerTitle = acl[0].name;
      });

    this.routesService.getRoutesForLayout()
      .pipe(takeUntil(this.destroy$))
      .subscribe((routes: AppNavItem[]) => {
        routes.map((route: AppNavItem) => {
          if (route) {
            this.items.push({
              title: route.title,
              icon: route.icon,
              link: route.link,
              expanded: route.expanded,
              children: route.children,
            });
          }
        });

        setTimeout(() => {
          this.cd.detectChanges();
        }, 0);
      });
  }

  toggleMenu() {
    this.sidebarService.toggle(true, 'left');
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['auth/login']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private resetSelection(items: NbMenuItem[]): NbMenuItem[] {
    const unselectedItems = [];
    for (const item of items) {
      if (item.selected) {
        unselectedItems.push(item);
      }

      item.selected = false;

      if (item.children) {
        unselectedItems.push(...this.resetSelection(item.children));
      }
    }
    return unselectedItems;
  }
}

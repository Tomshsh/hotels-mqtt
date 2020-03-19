import { Injectable } from '@angular/core';
import { RoutesDataRepository } from '@my-tray/data-layers/mytray/repositories';
import { Observable, of } from 'rxjs';
import { AppNavItem, RouteDto } from '@my-tray/api-interfaces';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private readonly routesDataRepository: RoutesDataRepository) {
  }


  getRoutesForLayout(): Observable<AppNavItem[]> {
    return fromPromise(this.routesDataRepository.getRoutes().then((routes: AppNavItem[]) => {
      return routes;
    }));
  }
}

const MOCK_ROUTING: RouteDto[] = [
  {
    path: 'dashboard', pathMatch: 'full', component: 'DashboardContainerComponent',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'users', component: 'UsersComponent' },
      { path: 'devices', component: 'DevicesComponent' },
    ]
  }
];

/*
* {
    path: 'dashboard',
    component: DashboardContainerComponent ,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: 'users', component: UsersComponent },
      // { path: 'devices', component: DevicesComponent },
    ],
    canActivate: [AuthGuard],
  }
*
* */

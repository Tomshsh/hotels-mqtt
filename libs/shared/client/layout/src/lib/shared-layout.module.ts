import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbMenuService,
  NbSidebarModule,
  NbSidebarService,
  NbSpinnerModule,
  NbThemeModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbAuthModule, NbAuthService, NbPasswordAuthStrategy, NbTokenService } from '@nebular/auth';
import { Route, RouterModule } from '@angular/router';
import { DashboardContainerComponent } from './containers';
import { SidebarContainerComponent } from './components';
import { AuthGuard } from '@my-tray/shared/client/auth';
import { DatagridComponent } from './components';
import { Ng2SmartTableModule } from 'ng2-smart-table';


const routes: Route[] = [
  { path: 'dashboard', component: DashboardContainerComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbLayoutModule,
    NbActionsModule,
    NbSpinnerModule,
    NbCardModule,
    NbSidebarModule,
    NbThemeModule.forRoot(),
    NbMenuModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
        }),
      ],
      forms: {},
    }),
    RouterModule.forRoot(routes),
    NbIconModule,
    Ng2SmartTableModule,
  ],
  providers: [NbAuthService, NbTokenService, NbSidebarService, NbMenuService],
  declarations: [DashboardContainerComponent, SidebarContainerComponent, DatagridComponent],
  exports: [RouterModule, DatagridComponent]
})

export class SharedLayoutModule {
}

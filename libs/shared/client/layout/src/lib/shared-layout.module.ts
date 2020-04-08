import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbMenuService,
  NbSidebarModule,
  NbSidebarService,
  NbSpinnerModule,
  NbThemeModule,
  NbToastrModule,
  NbDateService,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbAuthModule, NbAuthService, NbPasswordAuthStrategy, NbTokenService } from '@nebular/auth';
import { RouterModule } from '@angular/router';
import { DashboardContainerComponent } from './containers';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  DatagridComponent,
  DatepickerRendererComponent,
  DateRangePickerComponent,
  SidebarContainerComponent
} from './components';
import { NbMomentDateModule } from '@nebular/moment';

const components = [DashboardContainerComponent, SidebarContainerComponent, DatagridComponent, DateRangePickerComponent, DatepickerRendererComponent];

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbLayoutModule,
    NbActionsModule,
    NbSpinnerModule,
    NbCardModule,
    NbSidebarModule,
    NbToastrModule,
    NbThemeModule.forRoot({
      name: 'corporate'
    }),
    NbMenuModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
        }),
      ],
      forms: {},
    }),
    RouterModule,
    Ng2SmartTableModule,
    BrowserAnimationsModule,
    NbSpinnerModule,
    RouterModule,
    FormsModule,
    NbDatepickerModule.forRoot(),
  ],
  providers: [NbAuthService, NbTokenService, NbSidebarService, NbMenuService],
  declarations: [...components],
  exports: [RouterModule]
})

export class SharedLayoutModule {
}

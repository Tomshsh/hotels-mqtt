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
  NbMenuService, NbSelectModule,
  NbSidebarModule,
  NbSidebarService,
  NbSpinnerModule,
  NbThemeModule,
  NbToastrModule,
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
  SidebarContainerComponent,
  SelectListComponent,
  SelectListRendererComponent
} from './components';
import { BtnGroupComponent } from './components/btn-group/btn-group.component';

const components = [DashboardContainerComponent, SidebarContainerComponent, DatagridComponent, DateRangePickerComponent, DatepickerRendererComponent, SelectListComponent, SelectListRendererComponent];

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
    NbSelectModule,
    NbDatepickerModule.forRoot(),
  ],
  providers: [NbAuthService, NbTokenService, NbSidebarService, NbMenuService],
  declarations: [...components, BtnGroupComponent],
  exports: [RouterModule, DatagridComponent, DashboardContainerComponent, SelectListComponent, SelectListRendererComponent, BtnGroupComponent]
})

export class SharedLayoutModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbAlertModule, NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbDialogModule, NbDialogService,
  NbIconModule,
  NbInputModule,
  NbLayoutModule, NbListModule,
  NbMenuModule,
  NbMenuService,
  NbSelectModule,
  NbSidebarModule,
  NbSidebarService,
  NbSpinnerModule,
  NbThemeModule,
  NbToastrModule, NbToastrService, NbUserModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbAuthModule, NbAuthService, NbPasswordAuthStrategy, NbTokenService } from '@nebular/auth';
import { RouterModule } from '@angular/router';
import { DashboardContainerComponent } from './containers';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  ConfirmPromptDialogComponent,
  DatagridComponent,
  DatepickerRendererComponent,
  DateRangePickerComponent,
  NavigationComponent,
  SelectListComponent,
  SelectListRendererComponent,
  SidebarContainerComponent,
  IconRendererComponent
} from './components';
import { CustomActionsComponent } from './components/custom-actions/custom-actions.component';

const components = [
  DashboardContainerComponent,
  SidebarContainerComponent,
  DatagridComponent,
  DateRangePickerComponent,
  SelectListComponent,
  NavigationComponent,
  ConfirmPromptDialogComponent,
  DatepickerRendererComponent,
  SelectListRendererComponent,
  IconRendererComponent
];

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
    NbDialogModule.forRoot(),
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
    NbToastrModule.forRoot({
      preventDuplicates: true
    }),
    NbListModule,
    NbUserModule,
    NbBadgeModule
  ],

  providers: [NbAuthService, NbTokenService, NbSidebarService, NbMenuService, NbDialogService, NbToastrService],
  declarations: [...components, CustomActionsComponent],
  exports: [RouterModule, DatagridComponent, DashboardContainerComponent, SelectListComponent, SelectListRendererComponent, CustomActionsComponent, IconRendererComponent]
})

export class SharedLayoutModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbDialogModule, NbDialogService,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbMenuService,
  NbSelectModule,
  NbSidebarModule,
  NbSidebarService,
  NbSpinnerModule,
  NbThemeModule,
  NbToastrModule, NbToastrService
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
    })
  ],
<<<<<<< HEAD
  providers: [NbAuthService, NbTokenService, NbSidebarService, NbMenuService],
  declarations: [...components, CustomActionsComponent],
  exports: [RouterModule, DatagridComponent, DashboardContainerComponent, SelectListComponent, SelectListRendererComponent, CustomActionsComponent]
=======
  providers: [NbAuthService, NbTokenService, NbSidebarService, NbMenuService, NbDialogService, NbToastrService],
  declarations: [...components],
  exports: [RouterModule, DatagridComponent, DashboardContainerComponent, SelectListComponent, SelectListRendererComponent, IconRendererComponent]
>>>>>>> 900e91a4ada37eb5807e2b8f4cac2e69201d796b
})

export class SharedLayoutModule {
}

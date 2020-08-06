import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbAlertModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule,
  NbDialogService,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbMenuService,
  NbSelectModule,
  NbSidebarModule,
  NbSidebarService,
  NbSpinnerModule,
  NbThemeModule,
  NbToastrModule,
  NbToastrService,
  NbUserModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbAuthModule, NbAuthService, NbPasswordAuthStrategy, NbTokenService } from '@nebular/auth';
import { RouterModule } from '@angular/router';
import { DashboardContainerComponent } from './containers';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  ChipsAutocompleteFormComponent,
  ChipsComponent,
  ConfirmPromptDialogComponent,
  DatagridComponent,
  DatepickerRendererComponent,
  DateRangePickerComponent,
  IconRendererComponent,
  NavigationComponent,
  SelectListComponent,
  SelectListRendererComponent,
  SidebarContainerComponent,
  FormComponent,
} from './components';
import { MaterialLayoutModule } from './components/material-layout.module';
import { ToggleButtonListComponent } from './components/toggle-button-list/toggle-button-list.component';

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
  IconRendererComponent,
  ChipsComponent,
  ChipsAutocompleteFormComponent,
  ToggleButtonListComponent,
  ReactiveFormsModule
];
const exportComponents = [
  DatagridComponent,
  DashboardContainerComponent,
  SelectListComponent,
  SelectListRendererComponent,
  IconRendererComponent,
  ChipsComponent,
  ChipsAutocompleteFormComponent,
  ToggleButtonListComponent,
  FormComponent,
  ReactiveFormsModule,
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
    ReactiveFormsModule,
    NbSelectModule,
    NbDatepickerModule.forRoot(),
    NbToastrModule.forRoot({
      preventDuplicates: true
    }),
    NbListModule,
    NbUserModule,
    NbBadgeModule,
    MaterialLayoutModule,
  ],

  providers: [NbAuthService, NbTokenService, NbSidebarService, NbMenuService, NbDialogService, NbToastrService],
  declarations: [...components],
  exports: [
    ...exportComponents
  ]
})

export class SharedLayoutModule {
}

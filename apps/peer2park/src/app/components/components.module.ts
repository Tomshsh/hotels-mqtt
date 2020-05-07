import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { SharedLayoutModule } from '@my-tray/shared/layout';
import { DevicesComponent } from './devices/devices.component';
import { SocketStatusRendererComponent } from './socket-status-renderer/socket-status-renderer.component';
import { DeviceModalComponent } from './device-modal/device-modal.component'

import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NbDialogModule, NbCardModule, NbTreeGridModule } from '@nebular/theme';

@NgModule({
  declarations: [DevicesComponent, SocketStatusRendererComponent, DeviceModalComponent],
  imports: [
    CommonModule,
    SharedLayoutModule,
    ComponentsRoutingModule,
    MatButtonModule,
    FormsModule,
    NbDialogModule.forRoot(),
    NbCardModule,
    NbTreeGridModule
  ],
  providers: [
  ],
  entryComponents: [SocketStatusRendererComponent]
})
export class ComponentsModule {
}

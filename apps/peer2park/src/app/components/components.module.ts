import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { SharedLayoutModule } from '@my-tray/shared/layout';
import { DevicesComponent } from './devices/devices.component';
import { SocketStatusRendererComponent } from './socket-status-renderer/socket-status-renderer.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DevicesComponent, SocketStatusRendererComponent],
  imports: [
    CommonModule,
    SharedLayoutModule,
    ComponentsRoutingModule,
    FormsModule,
  ],
  providers: [
  ],
  entryComponents: [SocketStatusRendererComponent]
})
export class ComponentsModule {
}

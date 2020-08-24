import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { StaffAlertService, TowelsService, MaintanenceService, LockersService, TaskService } from './services';
import { BackendModule } from '@my-tray/shared/backend';

@Module({
  imports: [BackendModule, ],
  providers: [ApiService, StaffAlertService, TowelsService, MaintanenceService, LockersService, TaskService],
  exports: [ApiService, StaffAlertService, TowelsService, MaintanenceService, LockersService],
})
export class ApiModule { }

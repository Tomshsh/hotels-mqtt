import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { StaffAlertService } from './services';
import { BackendModule } from '@my-tray/shared/backend';
import { TowelsService } from './services';
import { MaintanenceService } from './services';
import { LockersService } from './services';

@Module({
  imports: [BackendModule],
  providers: [ApiService, StaffAlertService, TowelsService, MaintanenceService, LockersService],
  exports: [ApiService, StaffAlertService, TowelsService, MaintanenceService, LockersService],
})
export class ApiModule { }

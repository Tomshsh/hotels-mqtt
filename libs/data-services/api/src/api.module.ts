import { Module, HttpModule } from '@nestjs/common';
import { ApiService } from './api.service';
import { StaffAlertService, TowelsService, MaintanenceService, LockersService, TaskService, BillingService } from './services';
import { BackendModule } from '@my-tray/shared/backend';

@Module({
  imports: [BackendModule, HttpModule],
  providers: [ApiService, StaffAlertService, TowelsService, MaintanenceService, LockersService, TaskService, BillingService],
  exports: [ApiService, StaffAlertService, TowelsService, MaintanenceService, LockersService, BillingService],
})
export class ApiModule { }

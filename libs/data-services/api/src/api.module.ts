import { Module, HttpModule } from '@nestjs/common';
import { ApiService } from './api.service';
import { StaffAlertService, TowelsService, HousekeepingService, LockersService, TaskService, BillingService } from './services';
import { BackendModule } from '@my-tray/shared/backend';
import { MinibarsService } from './services/minibars';

@Module({
  imports: [BackendModule, HttpModule],
  providers: [ApiService, StaffAlertService, TowelsService, HousekeepingService, LockersService, TaskService, BillingService, MinibarsService],
  exports: [ApiService, StaffAlertService, TowelsService, HousekeepingService, LockersService, BillingService, MinibarsService],
})
export class ApiModule { }

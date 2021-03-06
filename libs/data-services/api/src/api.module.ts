import { Module, HttpModule } from '@nestjs/common';
import { ApiService } from './api.service';
import { StaffAlertService, TowelsService, HousekeepingService, LockersService, TaskService, BillingService, MinibarsService, LoggingService } from './services';
import { BackendModule } from '@my-tray/shared/backend';
import { TransactionsService } from './services/transactions/transactions.service';

@Module({
  imports: [BackendModule, HttpModule],
  providers: [ApiService, StaffAlertService, TowelsService, HousekeepingService, LockersService, TaskService, BillingService, MinibarsService, LoggingService, TransactionsService],
  exports: [ApiService, StaffAlertService, TowelsService, HousekeepingService, LockersService, BillingService, MinibarsService, LoggingService],
})
export class ApiModule { }

import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { StaffAlertService } from './services';
import { BackendModule } from '@my-tray/shared/backend';

@Module({
  imports:[BackendModule],
  providers: [ApiService, StaffAlertService],
  exports: [ApiService, StaffAlertService],
})
export class ApiModule {}

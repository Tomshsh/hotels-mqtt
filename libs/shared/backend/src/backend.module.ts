import { Module } from '@nestjs/common';
import { BackendService } from './backend.service';
import { ConfigurationService } from './configuration';
import { RmqService } from './rmq';

@Module({
  providers: [BackendService, ConfigurationService, RmqService],
  exports: [BackendService, ConfigurationService, RmqService],
})
export class BackendModule {}

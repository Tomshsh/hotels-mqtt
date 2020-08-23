import { Module } from '@nestjs/common';
import { BackendService } from './backend.service';
import { ConfigurationService } from './configuration/configuration.service';

@Module({
  providers: [BackendService, ConfigurationService],
  exports: [BackendService, ConfigurationService],
})
export class BackendModule {}

import { Module } from '@nestjs/common';
import { BackendService } from './backend.service';
import { ConfigurationService } from './services';

@Module({
  providers: [BackendService, ConfigurationService],
  exports: [BackendService, ConfigurationService],
})
export class BackendModule {}

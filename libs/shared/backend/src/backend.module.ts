import { Module } from '@nestjs/common';
import { BackendService } from './backend.service';
import { ConfigurationService } from './configuration';
import { UserService } from './user';

@Module({
  providers: [BackendService, ConfigurationService, UserService],
  exports: [BackendService, ConfigurationService, UserService],
})
export class BackendModule {}

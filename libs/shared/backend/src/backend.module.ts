import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BackendService } from './backend.service';
import { ConfigurationService } from './configuration';

@Module({
  imports: [ConfigService],
  providers: [BackendService, ConfigurationService],
  exports: [BackendService, ConfigurationService],
})
export class BackendModule { }

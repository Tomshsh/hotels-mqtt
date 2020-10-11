import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BackendService } from './backend.service';
import { ConfigurationService } from './configuration';
import { RmqService } from './rmq';

@Module({
  imports: [ConfigService],
  providers: [BackendService, ConfigurationService, RmqService],
  exports: [BackendService, ConfigurationService, RmqService],
})
export class BackendModule { }

import { Module } from '@nestjs/common';
import { BackendService } from './backend.service';
import { ConfigurationService } from './configuration';
import { MqttService } from './mqtt';

@Module({
  providers: [BackendService, ConfigurationService, MqttService],
  exports: [BackendService, ConfigurationService, MqttService],
})
export class BackendModule {}

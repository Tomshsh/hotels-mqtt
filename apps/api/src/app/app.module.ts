import { Module, Provider } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendModule, ConfigurationService } from '@my-tray/shared/backend'
import { environment } from '../environments'
import { ApiModule } from '@my-tray/data-services/api'
import { ScheduleModule } from '@nestjs/schedule'
import { RmqService } from '@my-tray/shared/backend/rmq';

export function initConfig(configurationService: ConfigurationService) {
  return configurationService.initializeConfiguration(environment);
}

function initRmq(rmqService: RmqService) {
  return rmqService.createConnection(environment)
}

const AppInitializer: Provider = {
  provide: 'APP_INITIALIZER',
  useFactory: initConfig,
  inject: [ConfigurationService],
}

const RmqInitializer: Provider = {
  provide: 'RMQ_INITIALIZER',
  useFactory: initRmq,
  inject: [RmqService]
}

@Module({
  imports: [BackendModule, ApiModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppInitializer, RmqInitializer, AppService]
})
export class AppModule { }

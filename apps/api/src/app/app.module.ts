import { Module, Provider } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendModule, ConfigurationService } from '@my-tray/shared/backend'
import {environment} from '../environments'
import {ApiModule} from '@my-tray/data-services/api'

export function initConfig(configurationService: ConfigurationService) {
  configurationService.initializeConfiguration(environment);
}

const AppInitializer: Provider = {
  provide: 'APP_INITIALIZER',
  useFactory: initConfig,
  inject: [ConfigurationService],
}

@Module({
  imports: [BackendModule, ApiModule],
  controllers: [AppController],
  providers: [AppService, AppInitializer]
})
export class AppModule { }

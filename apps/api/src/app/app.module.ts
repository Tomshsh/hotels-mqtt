import { Module, Provider } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environment } from '@my-tray/env/client/environment'
import { BackendModule, ConfigurationService } from '@my-tray/shared/backend'


export function initConfig(configurationService: ConfigurationService) {
  configurationService.initializeConfiguration(environment);
}

const AppInitializer: Provider = {
  provide: 'APP_INITIALIZER',
  useFactory: initConfig,
  inject: [ConfigurationService],
}

@Module({
  imports: [BackendModule],
  controllers: [AppController],
  providers: [AppService, AppInitializer]
})
export class AppModule { }

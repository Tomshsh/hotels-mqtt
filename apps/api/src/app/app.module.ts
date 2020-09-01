import { Module, Provider } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendModule, ConfigurationService } from '@my-tray/shared/backend'
import {environment} from '../environments'
import {ApiModule, BillingService} from '@my-tray/data-services/api'
import {ScheduleModule} from '@nestjs/schedule'
import { UserService } from '@my-tray/shared/backend/user';

export function initConfig(configurationService: ConfigurationService) {
  return configurationService.initializeConfiguration(environment);
}

function initBilling(billingService: BillingService){
  return billingService.defineRoutes(environment)
}

const AppInitializer: Provider = {
  provide: 'APP_INITIALIZER',
  useFactory: initConfig,
  inject: [ConfigurationService],
}

const BillingApiInit: Provider = {
  provide: 'BILLING_API_INITIALIZER',
  useFactory: initBilling,
  inject: [BillingService]
}

@Module({
  imports: [BackendModule, ApiModule, ScheduleModule.forRoot(), UserService],
  controllers: [AppController],
  providers: [AppInitializer, BillingApiInit, AppService]
})
export class AppModule { }

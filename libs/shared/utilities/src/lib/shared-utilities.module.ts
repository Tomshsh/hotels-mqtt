import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationService } from './services/configuration/configuration.service';

@NgModule({
  imports: [CommonModule],
  providers: [ConfigurationService]
})
export class SharedUtilitiesModule {}

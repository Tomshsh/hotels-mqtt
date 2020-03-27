import { Injectable } from '@angular/core';
import * as Parse from 'parse';

// ref: https://www.prestonlamb.com/blog/loading-app-config-in-app-initializer
// ref: https://davembush.github.io/where-to-store-angular-configurations/
// ref: https://github.com/rfreedman/angular-configuration-service/issues/1
// ref: https://nbe.io/load-a-configuration-at-runtime-with-angular/?_sm_au_=iHV7WtNDV1lNTHFVML8tvK34L00HF
@Injectable()
export class ConfigurationService {
  constructor() {
  }

  initializeConfiguration(environment) {
    Parse.initialize(environment.parse.appId);
    (Parse as any).serverURL = environment.parse.serverURL;
  }
}

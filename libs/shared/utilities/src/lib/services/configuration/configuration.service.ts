import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Parse from 'parse';

// ref: https://www.prestonlamb.com/blog/loading-app-config-in-app-initializer
// ref: https://davembush.github.io/where-to-store-angular-configurations/
// ref: https://github.com/rfreedman/angular-configuration-service/issues/1
// ref: https://nbe.io/load-a-configuration-at-runtime-with-angular/?_sm_au_=iHV7WtNDV1lNTHFVML8tvK34L00HF
@Injectable()
export class ConfigurationService {
  constructor(private readonly httpClient: HttpClient) {
  }

  initializeConfiguration(environment) {
    Parse.initialize(environment.parse.appId, environment.parse.masterKey);
    (Parse as any).serverURL = environment.parse.serverURL;
  }
}

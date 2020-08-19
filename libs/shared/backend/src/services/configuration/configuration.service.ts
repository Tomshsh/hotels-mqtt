import { Injectable } from '@nestjs/common';
import Parse from 'parse/node'


@Injectable()
export class ConfigurationService {
  constructor() {
  }

  initializeConfiguration(environment) {
    Parse.initialize(environment.parse.appId);
    (Parse as any).serverURL = environment.parse.serverURL;
  }
}
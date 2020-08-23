import { Injectable } from '@nestjs/common';
import twilio, {Twilio} from 'twilio'
import Parse from 'parse/node'

@Injectable()
export class ConfigurationService {

  twilio: Twilio;

  constructor() {}

  initializeConfiguration(environment) {
    Parse.initialize(environment.parse.appId);
    (Parse as any).serverURL = environment.parse.serverURL;

    this.twilio = twilio(environment.twilio.accountSid, environment.twilio.authToken)
  }
}


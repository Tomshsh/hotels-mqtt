import { Injectable } from '@nestjs/common';
import twilio, {Twilio} from 'twilio'
import Parse from 'parse/node'

@Injectable()
export class ConfigurationService {

  twilio: Twilio;

  constructor() {}

  async initializeConfiguration(environment) {
    Parse.initialize(environment.parse.appId);
    (Parse as any).serverURL = environment.parse.serverURL;

    const user = await Parse.User.logIn('a2@tt.com', '123456')

    this.twilio = twilio(environment.twilio.accountSid, environment.twilio.authToken)
  }
}


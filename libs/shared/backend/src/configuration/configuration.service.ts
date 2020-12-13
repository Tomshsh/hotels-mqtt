import { Injectable } from '@nestjs/common';
import twilio, { Twilio } from 'twilio'
import Parse, { User } from 'parse/node'

@Injectable()
export class ConfigurationService {

  twilio: Twilio;
  user: User

  constructor() { }

  async initializeConfiguration(environment) {
    Parse.initialize(environment.parse.appId);
    (Parse as any).serverURL = environment.parse.serverURL;

    this.user = await User.logIn('nest_api_app', '123456')

    setInterval(async () => {
      this.user = await User.logIn('nest_api_app', '123456')
    }, 3600 * 1000)

    this.twilio = twilio(environment.twilio.accountSid, environment.twilio.authToken)
  }
}


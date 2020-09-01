import { Injectable } from '@nestjs/common';
import twilio, {Twilio} from 'twilio'
import Parse from 'parse/node'
import {UserService} from '../user/user.service'

@Injectable()
export class ConfigurationService {

  twilio: Twilio;

  constructor(private userService: UserService) {}

  async initializeConfiguration(environment) {
    Parse.initialize(environment.parse.appId);
    (Parse as any).serverURL = environment.parse.serverURL;

    this.userService.login()

    this.twilio = twilio(environment.twilio.accountSid, environment.twilio.authToken)
  }
}


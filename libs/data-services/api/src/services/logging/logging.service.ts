import { ConfigurationService } from '@my-tray/shared/backend';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Parse from 'parse/node'

@Injectable()
export class LoggingService {
  constructor(
    private configService: ConfigService,
    private configurationService: ConfigurationService
  ) { }

  log(message: string, acl) {
    const log = new Parse.Object("Log")
    log.setACL(acl)
    return log.save({ message, user: this.configurationService.user.toPointer() })
      .catch((err) => { console.error(err) })
  }
}

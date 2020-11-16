import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Parse from 'parse/node'

@Injectable()
export class LoggingService {
  constructor(private configService: ConfigService) { }

  log(message: string) {
    const role = this.configService.get('parse').role
    const acl = new Parse.ACL()
    acl.setRoleReadAccess(role, true)
    acl.setRoleWriteAccess(role, true)
    const log = new Parse.Object("Log")
    log.setACL(acl)
    return log.save({ message })
      .catch((err) => {console.error(err) })
  }
}

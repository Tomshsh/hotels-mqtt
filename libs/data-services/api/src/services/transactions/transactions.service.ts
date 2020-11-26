import { ConfigurationService } from '@my-tray/shared/backend';
import { Injectable } from '@nestjs/common';
import Parse from 'parse/node'

class TransactionDto {
  objectId?: string
  createdAt?: Date
  status: 'pending' | 'ok' | 'refunded' | 'approved' | 'denied'
  amount: number
  description: string
  serial: string
  deviceId: string
  action: string
  roomNo: number
}

@Injectable()
export class TransactionsService {
  constructor(private configService: ConfigurationService) { }

  create(object: TransactionDto, acl: Parse.ACL) {
    const obj = new Parse.Object('Transaction')
    obj.setACL(acl)
    obj.save(object, { sessionToken: this.configService.user.getSessionToken() })
  }
}

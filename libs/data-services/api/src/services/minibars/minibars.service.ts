import { ConfigurationService } from '@my-tray/shared/backend';
import { Injectable } from '@nestjs/common';
import Parse from 'parse/node'

@Injectable()
export class MinibarsService {

  constructor(private configService: ConfigurationService) { }

  private findMinibar(deviceId) {
    return new Parse.Query("Minibar")
      .include('room')
      .get(deviceId, { sessionToken: this.configService.user.getSessionToken() });
  }

  async findProductPrice(itemType) {
    const sessionToken = this.configService.user.getSessionToken()
    const product = await new Parse.Query('Product')
      .equalTo('shortName', itemType)
      .first({ sessionToken })
    return product.get('price')
  }

  async get(deviceId, itemType) {
    const minibar = await this.findMinibar(deviceId)
    minibar.decrement(itemType, 1)
    return minibar.save(null, { sessionToken: this.configService.user.getSessionToken() })
  }

  async put(deviceId, itemType) {
    const minibar = await this.findMinibar(deviceId)
    minibar.increment(itemType, 1)
    return minibar.save(null, { sessionToken: this.configService.user.getSessionToken() })
  }
}

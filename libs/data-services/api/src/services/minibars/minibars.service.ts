import { ConfigurationService } from '@my-tray/shared/backend';
import { Injectable } from '@nestjs/common';
import Parse from 'parse/node'

@Injectable()
export class MinibarsService {

  constructor(private configService: ConfigurationService) { }

  private findMinibar(deviceId) {
    return new Parse.Query("Minibar")
      .include('room')
      .include('state.tag.product')
      .get(deviceId, { sessionToken: this.configService.user.getSessionToken() });
  }

  async findProductPrice(itemType) {
    const sessionToken = this.configService.user.getSessionToken()
    const product = await new Parse.Query('Product')
      .equalTo('title', itemType)
      .first({ sessionToken })
    return product.get('price')
  }

  async get(deviceId, itemType) {
    const minibar = await this.findMinibar(deviceId)
    const state: any[] = minibar.get("state")
    const index = state.findIndex(s => s.tag.get('product').get('title') == itemType)
    if (index > -1) {
      state.splice(index, 1)
      minibar.set('state', state)
      return minibar.save(null, { sessionToken: this.configService.user.getSessionToken() })
    } else { throw new Error('product with title: ' + itemType + ' was not found') }
  }

  async put(deviceId, itemType) {
    const sessionToken = this.configService.user.getSessionToken()
    const minibar = await this.findMinibar(deviceId)
    const innerQuery = new Parse.Query('Product').equalTo('title', itemType)
    const tag = await new Parse.Query('Tag').matchesQuery('product', innerQuery).first({ sessionToken })
    const newObj = {
      tag: tag.toPointer(),
      lastAction: 'refill',
      updatedAt: { type: '__date', iso: new Date() }
    }
    minibar.add('state', newObj)
    return minibar.save(null, { sessionToken })
  }
}
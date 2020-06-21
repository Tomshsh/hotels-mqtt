import * as Parse from 'parse';
import { Room } from '../../interfaces/room';
import { Tray } from '../../interfaces/tray';

export class TrayStateEntity extends Parse.Object {
  constructor() {
    super('TrayState');
  }

  get objectId(): string {
    return this.id;
  }

  get room(): Room {
    return this.get('room').toJSON();
  }

  set room(entity: Room) {
    this.set('room', entity);
  }

  get tray(): Tray {
    return this.get('tray').toJSON();
  }

  set tray(entity: Tray) {
    this.set('tray', entity);
  }
}

Parse.Object.registerSubclass('TrayState', TrayStateEntity);

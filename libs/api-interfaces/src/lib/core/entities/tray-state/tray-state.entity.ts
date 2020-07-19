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



/*
[
  {
    "productId": "jQLlmLIYYZ",
    "productShortName": "GL",
    "productTitle": "Glenfiddich",
    "tagId": "1234567890",
    "lastAction": "refill",
    "updatedAt": {
      "__type": "Date",
      "iso": "2020-06-29T06:51:05.223Z"
    }
  },
  {
    "productId": "GBQJCcILS2",
    "productShortName": "SN",
    "productTitle": "Snyders",
    "tagId": "1234567891",
    "lastAction": "momentary",
    "updatedAt": {
      "__type": "Date",
      "iso": "2020-06-29T06:51:05.223Z"
    }
  },
  {
    "productId": "Eh362aqqbb",
    "productShortName": "AL",
    "productTitle": "Almonds",
    "tagId": "1234567892",
    "lastAction": "charge",
    "updatedAt": {
      "__type": "Date",
      "iso": "2020-06-29T06:51:05.223Z"
    }
  },
  {
    "productId": "IfDZIegmx8",
    "productShortName": "CA",
    "productTitle": "Cashews",
    "tagId": "1234567893",
    "lastAction": "vcharge",
    "updatedAt": {
      "__type": "Date",
      "iso": "2020-06-29T06:51:05.223Z"
    }
  },
  {
    "productId": "kTh0lvleTM",
    "productShortName": "SN",
    "productTitle": "Snickers",
    "tagId": "1234567894",
    "lastAction": "replace",
    "updatedAt": {
      "__type": "Date",
      "iso": "2020-06-29T06:51:05.223Z"
    }
  },
  {
    "productId": "YmanhqjMm9",
    "productShortName": "MM",
    "productTitle": "MM",
    "tagId": "1234567895",
    "lastAction": "refill",
    "updatedAt": {
      "__type": "Date",
      "iso": "2020-06-29T06:51:05.223Z"
    }
  },
  {
    "productId": "uPoADNpP6M",
    "productShortName": "EN",
    "productTitle": "Energy bar",
    "tagId": "1234567896",
    "lastAction": "momentary",
    "updatedAt": {
      "__type": "Date",
      "iso": "2020-06-29T06:51:05.223Z"
    }
  },
  {
    "productId": "nJoEkXpceC",
    "productShortName": "WI",
    "productTitle": "Wine",
    "tagId": "1234567897",
    "lastAction": "charge",
    "updatedAt": {
      "__type": "Date",
      "iso": "2020-06-29T06:51:05.223Z"
    }
  },
  {
    "productId": "KgPsHODYhB",
    "productShortName": "WA",
    "productTitle": "Evian",
    "tagId": "1234567898",
    "lastAction": "vcharge",
    "updatedAt": {
      "__type": "Date",
      "iso": "2020-06-29T06:51:05.223Z"
    }
  },
  {
    "productId": "0U3sNnjGGA",
    "productShortName": "CHO",
    "productTitle": "Choya",
    "tagId": "1234567899",
    "lastAction": "replace",
    "updatedAt": {
      "__type": "Date",
      "iso": "2020-06-29T06:51:05.223Z"
    }
  },
  {
    "productId": "0U3sNnjGGA",
    "productShortName": "CHO",
    "productTitle": "Choya",
    "lastAction": "empty"
  },
  {
    "productId": "KgPsHODYhB",
    "productShortName": "WA",
    "productTitle": "Evian",
    "lastAction": "empty"
  },
  {
    "productId": "KgPsHODYhB",
    "productShortName": "WA",
    "productTitle": "Evian",
    "lastAction": "empty"
  },
  {
    "productId": "Fd1BtGU7Ax",
    "productShortName": "VO",
    "productTitle": "Vodka",
    "tagId": "123456789A",
    "lastAction": "refill",
    "updatedAt": {
      "__type": "Date",
      "iso": "2020-06-29T06:51:05.223Z"
    }
  }
]*/

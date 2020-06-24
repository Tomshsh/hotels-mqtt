import { TrayStateDto } from '@my-tray/api-interfaces';

export const MockedDataResponseArray: any[] = [{
  'products': [],
  'createdAt': '2020-06-07T13:39:43.916Z',
  'updatedAt': '2020-06-07T13:41:01.627Z',
  'room': {
    'createdAt': '2020-03-22T20:12:29.543Z',
    'updatedAt': '2020-06-06T21:29:57.927Z',
    'num': 1001,
    'isUtility': false,
    'isOccupied': true,
    'floor': 1,
    'name': 'room1-hotel2',
    'ACL': { 'role:hotel2': { 'read': true, 'write': true } },
    'objectId': 'jIGUT0ZDys',
    '__type': 'Object',
    'className': 'Room'
  },
  'tray': {
    'isOnline': true,
    'isService': false,
    'title': 'candies tray',
    'room': {
      'createdAt': '2020-03-22T20:12:29.543Z',
      'updatedAt': '2020-06-06T21:29:57.927Z',
      'num': 1001,
      'isUtility': false,
      'isOccupied': true,
      'floor': 1,
      'name': 'room1-hotel2',
      'ACL': { 'role:hotel2': { 'read': true, 'write': true } },
      'objectId': 'jIGUT0ZDys',
      '__type': 'Object',
      'className': 'Room'
    },
    'createdAt': '2020-03-22T21:01:27.436Z',
    'updatedAt': '2020-06-07T13:43:18.866Z',
    'template': {
      'title': 'template_hotel2',
      'products': [{
        'createdAt': '2020-03-22T19:14:33.583Z',
        'updatedAt': '2020-05-19T12:39:02.510Z',
        'title': 'ALMONDS',
        'price': 41.9,
        'currency': 'USD',
        'shortName': 'AL',
        'ACL': { 'role:hotel2': { 'read': true, 'write': true } },
        'objectId': 'eO05ywBNQe',
        '__type': 'Object',
        'className': 'Product'
      }, {
        'createdAt': '2020-03-22T19:16:13.821Z',
        'updatedAt': '2020-05-19T12:38:54.035Z',
        'title': 'FERRERO ROCHE',
        'price': 15.38,
        'currency': 'USD',
        'shortName': 'FE',
        'ACL': { 'role:hotel2': { 'read': true, 'write': true } },
        'objectId': 'vqbdY3KDPU',
        '__type': 'Object',
        'className': 'Product'
      }, {
        'title': 'ABSOLUT',
        'createdAt': '2020-05-11T23:01:08.172Z',
        'updatedAt': '2020-05-19T12:38:42.609Z',
        'price': 191.69,
        'currency': 'USD',
        'shortName': 'AB',
        'ACL': { 'role:hotel2': { 'read': true, 'write': true } },
        'objectId': 'yFxQy73v0p',
        '__type': 'Object',
        'className': 'Product'
      }],
      'createdAt': '2020-05-31T21:20:43.748Z',
      'updatedAt': '2020-06-07T13:43:38.605Z',
      'ACL': { 'role:hotel2': { 'read': true, 'write': true } },
      'objectId': 'CYvpgbGB2x',
      '__type': 'Object',
      'className': 'TrayTemplate'
    },
    'ACL': { 'role:hotel2': { 'read': true, 'write': true } },
    'objectId': '3PI_12345670',
    '__type': 'Object',
    'className': 'Tray'
  },
  'ACL': { 'role:hotel2': { 'read': true, 'write': true } },
  'objectId': '942piwpiPK'
}];

import { readFileSync } from 'fs';

export const environment = {
  production: false,
  parse: {
    serverURL: 'https://hotelapi.3pi-solutions.com/api/', // Self-hosted Parse Server
    appId: 'hotel2AppId',
    appName: 'MyApp',
    role: 'hotel2'
  },
  twilio: {
    accountSid: 'ACb7d59a6b06158abf273516d392549ac2',
    authToken: 'd61621e101b9b267279e73ee28631670'
  },
  mqtt: {
    host: "mqtts://mqtts.3pi-solutions.com:39001",
    username: "tomer",
    password: "tomer",
    ca: readFileSync('apps/api/src/environments/3pi-solutions-CA.crt')
  },
  rmq:{
    url: 'amqp://localhost'
  }

}
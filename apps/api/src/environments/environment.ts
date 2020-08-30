export const environment = {
  production: false,
  parse: {
    serverURL: 'https://hotelapi.3pi-solutions.com/api/', // Self-hosted Parse Server
    appId: 'hotel2AppId',
    appName: 'MyApp'
  },
  twilio: {
    accountSid: 'ACb7d59a6b06158abf273516d392549ac2',
    authToken: 'd61621e101b9b267279e73ee28631670'
  },


  billing: {
    chargeRoute: "http://localhost:1337/charge",
    refundRoute: "http://localhost:1337/refund"
  }

}
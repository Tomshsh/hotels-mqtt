import { IEnvironment } from '@my-tray/api-interfaces';

const apiHost = 'hotelapi.3pi-solutions.com';
const apiUrl = `http://${ apiHost }/api/`;

export const environment: IEnvironment = {
  production: false,
  enableDebugTools: true,
  logLevel: 'debug',
  apiHost,
  apiUrl,
  parse: {
    serverURL: apiHost,
    appId: 'hotel2AppId',
    appName: 'MyApp'
  }
};


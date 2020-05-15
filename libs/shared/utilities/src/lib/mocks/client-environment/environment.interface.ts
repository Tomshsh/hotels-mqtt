export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface IEnvironment {
  production: boolean;
  // Enables use of ng.profiler.timeChangeDetection(); in browser console
  enableDebugTools: boolean;
  logLevel: LogLevel;
  apiUrl: string;
  apiHost: string;
  parse: {
    serverURL: string
    appId: string,
    appName: string
  }
}

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


import * as storage from '../../../core/utils';

export interface AuthSessionState {
  username: string
  token: string;
  acl: any;
}

export function createInitialAuthSessionsState(): AuthSessionState {
  return {
    token: null,
    username: null,
    acl: null,
    ...storage.getSession()
  }
}

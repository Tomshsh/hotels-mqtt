import * as storage from '../../../core/utils';

export interface AuthSessionState {
  username: string
  token: string;
}

export function createInitialAuthSessionsState(): AuthSessionState {
  return {
    token: null,
    username: null,
    ...storage.getSession()
  }
}

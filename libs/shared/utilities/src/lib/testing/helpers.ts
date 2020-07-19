import Mock = jest.Mock;
import { defer } from 'rxjs';

export const createSpyObj = (baseName, methodNames): { [key: string]: Mock<any> } => {
  const obj: any = {};
  for (let i = 0; i < methodNames.length; i++) {
    obj[methodNames[i]] = jest.fn();
  }
  return obj;
};


export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

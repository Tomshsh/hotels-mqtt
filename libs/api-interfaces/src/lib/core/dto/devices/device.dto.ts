import { BaseDtoInterface } from '@my-tray/api-interfaces';

export class DeviceDto implements BaseDtoInterface{
  name: string;
  createdAt: Date;
  readonly objectId: string;
}

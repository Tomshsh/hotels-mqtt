import { Room } from '../room';

export interface Tray {
  readonly objectId: string;
  readonly title: string;
  readonly room: Room;
  readonly isOnline: boolean;
  readonly isService: boolean;
}

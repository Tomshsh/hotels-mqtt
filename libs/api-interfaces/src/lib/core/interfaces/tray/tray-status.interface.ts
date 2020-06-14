import { Room, Tray } from '@my-tray/api-interfaces';

export interface TrayStatus {
  readonly objectId: string;
  readonly room: Room;
  readonly tray: Tray;
}

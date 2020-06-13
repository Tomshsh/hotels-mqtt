import { Product, Room, Tray } from '@my-tray/api-interfaces';

export interface Status {
  readonly room: Room;
  readonly tray: Tray;
  readonly product: Product[];
}

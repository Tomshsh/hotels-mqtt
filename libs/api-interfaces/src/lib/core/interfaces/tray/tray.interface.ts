import { Room } from '../room';
import { Template } from './template.interface';

export interface Tray {
  readonly objectId: string;
  readonly title: string;
  readonly room: Room;
  readonly isOnline: boolean;
  readonly isService: boolean;
  readonly template?: Template;
}

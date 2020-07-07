import { Room } from '../room';
import { Template } from './template.interface';
import { Tag } from '../tag';

export interface Tray {
  readonly objectId: string;
  readonly title: string;
  readonly room: Room;
  readonly isOnline: boolean;
  readonly isService: boolean;
  readonly template?: Template;
  readonly states: ProductState[]
}

export interface ProductState {
  readonly lastAction: string;
  readonly updatedAt: Date;
  readonly tag: Tag;
}


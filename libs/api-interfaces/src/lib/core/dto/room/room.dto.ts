import { Room } from '../../interfaces/room';

export class RoomDto implements Room {
  readonly objectId: string;
  readonly floor: number;
  readonly isOccupied: boolean;
  readonly isUtility: boolean;
  readonly name: string;
  readonly num: number;
}

export class SelectRoomDto {
  readonly value?: string;
  readonly title?: string;
}

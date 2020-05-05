import { RoomDto, SelectRoomDto } from '@my-tray/api-interfaces';

export class TrayDto {
  readonly objectId: string;
  readonly title: string;
  readonly isOnline: boolean;
  readonly isService: boolean;
  readonly room: RoomDto & SelectRoomDto;
}

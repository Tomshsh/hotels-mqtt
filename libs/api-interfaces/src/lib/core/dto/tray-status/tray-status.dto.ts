import { RoomDto, TrayDto } from '@my-tray/api-interfaces';

export class TrayStatusDto {
  readonly objectId: string;
  readonly room: RoomDto;
  readonly tray: TrayDto;
}

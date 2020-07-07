import { RoomDto, SelectRoomDto, TagStateDto, TemplateDto } from '@my-tray/api-interfaces';

export class TrayDto {
  readonly objectId: string;
  readonly title: string;
  readonly isOnline: boolean;
  readonly isService: boolean;
  readonly room: RoomDto & SelectRoomDto;
  readonly template: TemplateDto;
  readonly states: ProductStateDto[];
}

export interface ProductStateDto {
  readonly lastAction: string;
  readonly updatedAt: Date;
  readonly tag: TagStateDto;
}

import { RoomDto, TemplateDto, TrayDto } from '@my-tray/api-interfaces';

export class TrayStateDto {
  readonly objectId: string;
  readonly room: RoomDto;
  readonly tray: TrayWithTemplateDto;
}

export class TrayWithTemplateDto {
  template: TemplateDto;
}

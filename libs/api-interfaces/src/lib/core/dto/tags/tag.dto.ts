import { BaseDtoInterface } from '@my-tray/api-interfaces';


export interface TagDto extends BaseDtoInterface {
  expDate: string;
  readonly productPrice: number;
  readonly productTitle: string;
}

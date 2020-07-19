import { BaseDtoInterface } from '../base-dto.interface';

export interface TagDto extends BaseDtoInterface {
  expDate: Date;
  readonly productPrice: number;
  readonly productTitle: string|any;
  readonly productObjectId?: string;
}

export interface TagStateDto {
  readonly title: string;
  readonly abbr: string;
}

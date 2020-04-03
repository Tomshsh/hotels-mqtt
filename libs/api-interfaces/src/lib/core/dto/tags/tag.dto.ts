import { BaseDtoInterface } from '../base-dto.interface';

export interface TagDto extends BaseDtoInterface {
  expDate: string;
  readonly productPrice: number;
  readonly productTitle: string;
}

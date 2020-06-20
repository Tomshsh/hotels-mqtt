import { ProductDto } from '@my-tray/api-interfaces';

export class TemplateDto {
  readonly objectId: string;
  readonly title: string;
  readonly products: ProductDto[];
}

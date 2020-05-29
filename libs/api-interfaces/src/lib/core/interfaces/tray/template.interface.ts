import { Product } from '../product';

export interface Template {
  readonly objectId: string;
  readonly title: string;
  readonly products: Product[];
}

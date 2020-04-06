import { Product } from '../product';

export interface Tag {
  readonly objectId: string;
  product: Product;
  readonly expDate: string;
}

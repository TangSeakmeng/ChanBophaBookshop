import { Brand } from './brand.model';
import { Category } from './category.model';
import { Gallery } from './gallery.model';

export interface Product {
  key: string,
  itemCode: string,
  name: string,
  description: string,
  category: Category,
  brand: Brand,
  color: string,

  images: Gallery[],

  createdAt: number,
  updatedAt: number
}

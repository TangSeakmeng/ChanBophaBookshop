import { Injectable } from '@angular/core';
import { Brand } from 'src/app/models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandMappingService {

  constructor() { }

  MapBrandObj(brand: Brand) {
    if(brand == null) {
      return brand;
    }
    else {
      return {
        key: brand.key,
        name: brand.name,
      }
    }
  }
}

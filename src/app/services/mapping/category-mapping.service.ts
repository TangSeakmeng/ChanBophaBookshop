import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryMappingService {

  constructor() { }

  MapCategoryObj(category: Category) {
    if(category == null) {
      return category;
    }
    else {
      return {
        key: category.key,
        name: category.name
      }
    }
  }

  MapSubCategoryObj(category: Category) {
    if(category == null) {
      return category;
    }
    else {
      return {
        key: category.key,
        name: category.name,
        subcategory: {
          id: category.subcategory.key,
          name: category.subcategory.name
        }
      }
    }
  }

  MapSubSubCategoryObj(category: Category) {
    if(category == null) {
      return category;
    }
    else {
      return {
        key: category.key,
        name: category.name,
        subcategory: {
          key: category.subcategory.key,
          name: category.subcategory.name
        },
        subsubcategory: {
          key: category.subsubcategory.key,
          name: category.subsubcategory.name
        },
      }
    }
  }
}

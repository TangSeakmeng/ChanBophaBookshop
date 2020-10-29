import { action, computed, observable } from "mobx";
import { Injectable } from "@angular/core";
import { Category } from '../models/category.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({providedIn:'root'})
export class SubCategoryStore {
  @observable public subCategories = [];
  @observable public subCategory;

  constructor(private afs: AngularFirestore) {}

  @action
  getFilteredSubcategories(categoryname) {
    if(categoryname === null)
      return this.subCategories
    else {
      let result = this.subCategories.filter(element => {
          return element.subcategory.name == categoryname
      });

      return result;
    }
  }

  @action
  getCategories() {
    this.afs.collection('subCategories').valueChanges().subscribe((data) => {
      this.subCategories = data
    })
  }

  @action
  addCategory(category: Category) {
    const key = this.afs.createId()
    this.afs.collection('subCategories').add({
      key,
      ...category,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  }

  @action
  deleteCategory(category: Category) {
    this.afs.collection(`subCategories`).doc(category.key).delete();
  }

  @action
  updateCategory(category: Category) {
    this.afs.collection(`subCategories`).doc(category.key).update(category);
  }
}

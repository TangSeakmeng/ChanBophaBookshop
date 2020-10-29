import { action, observable } from "mobx";
import { Injectable } from "@angular/core";
import { Category } from '../models/category.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({providedIn:'root'})
export class SubSubCategoryStore {
  @observable public subSubCategories = [];
  @observable public subSubCategory;

  constructor(private afs: AngularFirestore) {}

  @action
  getCategories() {
    this.afs.collection('subSubCategories').valueChanges().subscribe((data) => {
      this.subSubCategories = data
    })
  }

  @action
  addCategory(category: Category) {
    const key = this.afs.createId()
    this.afs.collection('subSubCategories').add({
      key,
      ...category,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  }

  @action
  deleteCategory(category: Category) {
    this.afs.collection(`subSubCategories`).doc(category.key).delete();
  }

  @action
  updateCategory(category: Category) {
    this.afs.collection(`subSubCategories`).doc(category.key).update(category);
  }
}

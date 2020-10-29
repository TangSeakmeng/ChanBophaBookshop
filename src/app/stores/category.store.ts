import { action, observable } from "mobx";
import { Injectable } from "@angular/core";
import { Category } from '../models/category.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({providedIn:'root'})
export class CategoryStore {
  @observable public categories = [];
  @observable public category;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {}

  @action
  getCategories() {
    this.afs.collection('categories').valueChanges().subscribe((data) => {
      this.categories = data
    })
  }

  @action
  addCategory(category: Category) {
    const key = this.afs.createId()
    this.afs.collection('categories').add({
      key,
      ...category,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  }

  @action
  deleteCategory(category: Category) {
    this.afs.collection(`categories`).doc(category.key).delete();
  }

  @action
  updateCategory(category: Category) {
    this.afs.collection(`categories`).doc(category.key).update(category);
  }
}

import { action, observable } from "mobx";
import { Injectable } from "@angular/core";
import { Category } from '../models/category.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { groupBy } from 'rxjs/operators';
import { DataManipulationService } from '../services/data-manipulation/data-manipulation.service';
import { Product } from '../models/product.model';

@Injectable({providedIn:'root'})
export class CategoryStore {
  @observable public categories = [];
  @observable public category;

  @observable private categories_2 = [];
  @observable public categories_6_elements = [];
  @observable public ProductsByCategory = [];

  @observable loading = false;

  constructor(private afs: AngularFirestore) {}

  @action
  getCategories() {
    this.loading = true;
    this.afs.collection('categories').valueChanges().subscribe((data) => {
      this.categories = data;
      this.loading = false;
    })
  }

  @action
  getPublishedCategories() {
    this.afs.collection('categories', ref => ref.where('published', '==', true)).valueChanges().subscribe((data) => {
      this.categories = data

      if(this.categories.length > 7) {
        this.categories_6_elements = [];

        this.categories.forEach((item, index) => {
          if(index <= 5)
            this.categories_6_elements.push(item)
          else
            return;
        })
      }
    })
  }

  @action
  getGroupProductsByCategories() {
    this.afs.collection('categories', ref => ref.where('publishedOnHomePage', '==', true).where('published', '==', true)).valueChanges().subscribe((data) => {
      this.categories_2 = data

      // this.categories_2.forEach((each_category) => {
      //   this.afs.collection('products', ref => ref.where('category.subcategory.id', '==', each_category.key).where('published', '==', true).limit(8)).valueChanges().subscribe((data2) => {
      //     this.ProductsByCategory.push({
      //       key : each_category,
      //       value: data2
      //     });
      //   })
      // })

      this.categories_2.forEach((each_category) => {
        this.afs.collection('products', ref => ref.where('category.subcategory.key', '==', each_category.key).where('published', '==', true).limit(8)).valueChanges().subscribe((data2) => {
          this.ProductsByCategory.push({
            key : each_category,
            value: data2
          });
        })
      })
    })
  }

  @action
  getCategoryByKey(key) {
    this.afs.collection('categories').doc(key).valueChanges().subscribe((data) => {
      this.category = data
    })
  }

  @action
  addCategory(category: Category) {
    const key = this.afs.createId()
    this.afs.collection('categories').doc(key).set({
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

  @action
  updateCategoryPublished(category: Category, published: boolean) {
    this.afs.collection(`categories`).doc(category.key).update({ ...category, published });
  }

  @action
  updateCategoryPublishedOnHomePage(category: Category, publishedOnHomePage: boolean) {
    this.afs.collection(`categories`).doc(category.key).update({ ...category, publishedOnHomePage });
  }
}

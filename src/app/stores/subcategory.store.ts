import { action, computed, observable } from "mobx";
import { Injectable } from "@angular/core";
import { Category } from '../models/category.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataManipulationService } from '../services/data-manipulation/data-manipulation.service';

@Injectable({providedIn:'root'})
export class SubCategoryStore {
  @observable public subCategories = [];
  @observable public subCategories_2 = [];
  @observable public subCategory;

  @observable public groupedCategory = [];

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
  getPublishedCategories() {
    this.afs.collection('subCategories', ref => ref.where('published', '==', true)).valueChanges().subscribe((data) => {
      this.subCategories = data
    })
  }

  @action
  getCategoryByKey(key) {
    this.afs.collection('subCategories').doc(key).valueChanges().subscribe((data) => {
      this.subCategory = data
    })
  }

  @action
  getCategoryThroughParent(parentKey) {
    this.afs.collection('subCategories', ref => ref.where('subcategory.key', '==', parentKey)).valueChanges().subscribe(data => {
      this.subCategories = data
    });
  }

  @action
  getAllRelatedSubCategory(key) {
    if(key != undefined)
      this.afs.collection('subCategories').doc(key).valueChanges().subscribe((data) => {
        this.subCategory = data
        this.afs.collection('subCategories', ref => ref.where('subcategory.key', '==', this.subCategory ? this.subCategory.subcategory.key : key)).valueChanges().subscribe(data => {
          this.subCategories_2 = data
        });
      })
    else {
      this.afs.collection('subCategories', ref => ref.limit(10)).valueChanges().subscribe((data) => {
        this.subCategories_2 = data
      })
    }
  }

  @action
  addCategory(category: Category) {
    const key = this.afs.createId()
    this.afs.collection('subCategories').doc(key).set({
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

  @action
  updateCategoryPublished(category: Category, published: boolean) {
    this.afs.collection(`subCategories`).doc(category.key).update({ ...category, published });
  }

  @action
  getCategoryUsingGroupBy() {
    this.afs.collection('subCategories').valueChanges().subscribe(data => {
      this.groupedCategory = DataManipulationService.groupBy(data, 'subcategory.key', 'subcategory.key')
    });
  }
}

import { observable } from "mobx";
import { Injectable } from "@angular/core";
import { Brand } from '../models/brand.model';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({providedIn:'root'})
export class BrandStore {
  @observable public brands = [];
  @observable public brand;

  @observable public loading: boolean = false;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {}

  getBrands() {
    this.loading = true;
    this.afs.collection('brands').valueChanges().subscribe((data) => {
      this.brands = data;
      this.loading = false;
    })
  }

  getBrandByKey(key) {
    this.afs.collection('brands').doc(key).valueChanges().subscribe((data) => {
      this.brand = data
    })
  }

  addBrand(brand: Brand) {
    const key = this.afs.createId()
    this.afs.collection('brands').doc(key).set({
      key,
      ...brand,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  }

  deleteBrand(brand: Brand) {
    this.storage.ref(brand.imagePath).delete();
    this.afs.collection(`brands`).doc(brand.key).delete();
  }

  updateBrand(brand: Brand, old_ImagePath) {
    if(old_ImagePath) {
      this.storage.ref(old_ImagePath).delete();
    }

    this.afs.collection(`brands`).doc(brand.key).update(brand);
  }
}

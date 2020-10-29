import { observable } from "mobx";
import { Injectable } from "@angular/core";
import { ProductColor } from "../models/productColor.model";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({providedIn:'root'})
export class ProductColorStore {
  @observable public productColors = [];
  @observable public productColor;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {}

  getProductColors() {
    this.afs.collection('productColors').valueChanges().subscribe((data) => {
      this.productColors = data
    })
  }

  addProductColor(productColor: any) {
    const key = this.afs.createId()
    this.afs.collection('productColors').doc(key).set({
      key,
      ...productColor,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  }

  deleteProductColor(productColor) {
    this.afs.collection(`productColors`).doc(productColor.key).delete();

    productColor.images.forEach((item) => {
      this.storage.ref(item.imagePath).delete();
    })
  }

  updateProductColor(productColor: ProductColor, old_ImagePath) {
    if(old_ImagePath) {
      this.storage.ref(old_ImagePath).delete();
    }

    this.afs.collection(`productColors`).doc(productColor.key).update(productColor);
  }

  getProductColorById(id) {
    this.afs.collection('productColors').doc(id).valueChanges().subscribe((data) => {
      this.productColor = data
    })
  }

  getProductColorsByProductId(productId) {
    this.afs.collection('productColors', ref => ref.where('productId', '==', productId)).valueChanges().subscribe(data => {
      this.productColors = data
    });
  }

  getProductColorByProductIdThenDelete(productId) {
    this.afs.collection('productColors', ref => ref.where('productId', '==', productId)).valueChanges().subscribe(data => {
      data.forEach(item => {
        this.deleteProductColor(item);
      })
    });
  }
}

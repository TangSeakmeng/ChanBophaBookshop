import { observable } from "mobx";
import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { ProductColorStore } from '../stores/productColor.store';
import { DataManipulationService } from '../services/data-manipulation/data-manipulation.service';
import { ProductColor } from '../models/productColor.model';

@Injectable({providedIn:'root'})
export class ProductStore {
  @observable public products = [];
  @observable public product;

  constructor(private afs: AngularFirestore, private productColorStore: ProductColorStore, private storage: AngularFireStorage) {}

  getProducts() {
    this.afs.collection('products').valueChanges().subscribe((data) => {
      this.products = data
    })
  }

  getProductById(productId) {
    this.afs.collection('products').doc(productId).valueChanges().subscribe((data) => {
      this.product = data
    })
  }

  getProductByCategory(categoryName) {
    this.afs.collection('products', ref => ref.where('category.name', '==', categoryName)).valueChanges().subscribe(data => {
      this.products = data
    });
  }

  addProduct(product: any) {
    const key = this.afs.createId()
    this.afs.collection('products').doc(key).set({
      key,
      ...product,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  }

  deleteProduct(product: Product) {
    this.getColorCollection(product.key);

    this.productColorStore.productColors.forEach((color) => {
      this.deleteImageProduct(color.imagePath)
    })

    this.afs.collection(`products`).doc(product.key).delete();

    product.images.forEach((item) => {
      this.storage.ref(item.imagePath).delete();
    });
  }

  deleteImageProduct(imagePath) {
    this.storage.ref(imagePath).delete();
  }

  updateProduct(product: Product) {
    this.afs.collection(`products`).doc(product.key).update(product);
  }

  getColorCollection(productId) {
    this.afs.collection('products').doc(productId).collection('colorCollection').valueChanges().subscribe(data => {
      this.productColorStore.productColors = data
      return this.productColorStore.productColors
    });
  }

  getColorCollectionUsingGroupBy(productId) {
    this.afs.collection('products').doc(productId).collection('colorCollection').valueChanges().subscribe(data => {
      this.productColorStore.productColors = DataManipulationService.groupBy(data,'color','color')
    });
  }

  addColorToColorCollection(data, productId) {
    const key = this.afs.createId()
    this.afs.collection('products').doc(productId).collection('colorCollection').doc(key).set({ ...data, key });
  }

  deleteColorFromColorCollection(productColor: ProductColor) {
    this.afs.collection('products').doc(productColor.productId).collection('colorCollection').doc(productColor.key).delete();
    this.storage.ref(productColor.imagePath).delete();
  }
}

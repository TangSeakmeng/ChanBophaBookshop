import { action, observable } from "mobx";
import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { ProductColorStore } from '../stores/productColor.store';
import { DataManipulationService } from '../services/data-manipulation/data-manipulation.service';
import { ProductColor } from '../models/productColor.model';
import { generateKeywords, GenerateKeywordService } from '../services/generate-keyword/generate-keyword.service';

@Injectable({providedIn:'root'})
export class ProductStore {
  @observable public products = [];
  @observable public product;

  @observable paymentData = [];
  @observable data: any = [];
  @observable cashierData: any = [];
  @observable payments: any = [];
  @observable dataDoc = null;
  @observable onlinedata: any = [];
  @observable loading = false;
  @observable process = false;
  @observable grandTotal = 0;
  @observable public confirmPayments = [];
  @observable public SelectedconfirmPayments = null;
  public lastVisible: any = null;
  @observable public fetching: boolean = false;
  @observable public searchText = null;
  @observable public filter = null;

  constructor(
    private afs: AngularFirestore,
    private productColorStore: ProductColorStore,
    private storage: AngularFireStorage,
    ) {}

  @action
  getProducts() {
    this.afs.collection('products').valueChanges().subscribe((data) => {
      this.products = data
    })
  }

  @action
  getProductById(productId) {
    this.afs.collection('products').doc(productId).valueChanges().subscribe((data) => {
      this.product = data
    })
  }

  @action
  getProductByCategory(categoryName) {
    this.afs.collection('products', ref => ref.where('category.name', '==', categoryName)).valueChanges().subscribe(data => {
      this.products = data
    });
  }

  @action
  addProduct(product: any) {
    const key = this.afs.createId()
    const keywords = generateKeywords([ product.name ])

    this.afs.collection('products').doc(key).set({
      key,
      keywords,
      ...product,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  }

  @action
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

  @action
  deleteImageProduct(imagePath) {
    this.storage.ref(imagePath).delete();
  }

  @action
  updateProduct(product: Product) {
    this.afs.collection(`products`).doc(product.key).update(product);
  }

  @action
  updateProductPublished(product: Product, published: boolean) {
    this.afs.collection(`products`).doc(product.key).update({ ...product, published });
  }

  @action
  getColorCollection(productId) {
    this.afs.collection('products').doc(productId).collection('colorCollection').valueChanges().subscribe(data => {
      this.productColorStore.productColors = data
      return this.productColorStore.productColors
    });
  }
  @action
  getColorCollectionUsingGroupBy(productId) {
    this.afs.collection('products').doc(productId).collection('colorCollection').valueChanges().subscribe(data => {
      this.productColorStore.productColors = DataManipulationService.groupBy(data,'color','color')
    });
  }

  @action
  addColorToColorCollection(data, productId) {
    const key = this.afs.createId()
    this.afs.collection('products').doc(productId).collection('colorCollection').doc(key).set({ ...data, key });
  }

  @action
  deleteColorFromColorCollection(productColor: ProductColor) {
    this.afs.collection('products').doc(productColor.productId).collection('colorCollection').doc(productColor.key).delete();
    this.storage.ref(productColor.imagePath).delete();
  }

  @action
  searchProductByName(keyword) {
    this.afs.collection('products', ref => ref.where('keywords', 'array-contains', keyword.toUpperCase())).valueChanges().subscribe(data => {
      this.products = data
    });
  }

  @action
  searchProductByCategory(keyword) {
    this.afs.collection('products', ref => ref.where('category.name', '==', keyword)).valueChanges().subscribe(data => {
      this.products = data
    });
  }

  @action
  getProductByCategoryKey(key) {
    this.afs.collection('products', ref => ref.where('category.key', '==', key)).valueChanges().subscribe(data => {
      this.products = data
    });
  }

  @action
  getProductByCategoryKeyAndFilterByBrand(key, brands) {
    let brands_id = [];
    brands.forEach((brand) => brands_id.push(brand.key));

    if(brands.length == 0)
      this.afs.collection('products', ref => ref.where('category.key', '==', key)).valueChanges().subscribe(data => {
        this.products = data
      });
    else
      this.afs.collection('products', ref => ref.where('category.key', '==', key).where('brand.key', 'in', brands_id)).valueChanges().subscribe(data => {
        this.products = data
      });
  }

  @action
  getProductBySearchKeywordAndFilterByBrand(keyword, brands) {
    let brands_id = [];
    brands.forEach((brand) => brands_id.push(brand.key));

    if(brands.length == 0)
      this.afs.collection('products', ref => ref.where('keywords', 'array-contains', keyword.toUpperCase())).valueChanges().subscribe(data => {
        this.products = data
      });
    else
      this.afs.collection('products', ref => ref.where('keywords', 'array-contains', keyword.toUpperCase()).where('brand.key', 'in', brands_id)).valueChanges().subscribe(data => {
        this.products = data
      });
  }

  @action
  getProductBySubCategoryKey(key) {
    this.afs.collection('products', ref => ref.where('category.subcategory.id', '==', key)).valueChanges().subscribe(data => {
      this.products = data
    });
  }

  @action
  getDefaultColorImage(productKey) {
    this.afs.collection('products').doc(productKey).valueChanges().subscribe((data) => {
      this.product = data
    })
  }

  @action
  getSelectedColorImages(productKey, colorKey) {
    this.afs.collection('products').doc(productKey).collection('colorCollection', ref => ref.where('key', '==', colorKey)).valueChanges().subscribe((data) => {
      let tempData = data;
      this.product.images = tempData
    })
  }

  @action
  async fetchDataFireUser(search: any, filter: any) {
    this.loading = true;
    this.lastVisible = null;
    this.fetching = false;
    this.searchText = search;
    this.filter = filter;
    const ref = this.lazyUserRef(this.lastVisible, search, filter)
    ref.auditTrail().subscribe();
    ref.snapshotChanges().subscribe(response => {
      this.data = [];
      if (!response.length) {
        this.loading = false;
        this.fetching = false;
        return false;
      }
      this.lastVisible = response[response.length - 1].payload.doc;
      for (let item of response) {
        this.data.push(item.payload.doc.data());
      }
      this.loading = false
      this.fetching = false;
    }, error => {
      this.loading = false;
    });
  }

  @action
  async fetchDataFireUserMore() {
    this.fetching = true;
    this.lazyUserRef(this.lastVisible, this.searchText, this.filter).get().subscribe(response => {
      if (!response.docs.length) {
        this.loading = false
        this.fetching = false;
        return;
      }
      this.lastVisible = response.docs[response.docs.length - 1];
      for (let item of response.docs) {
        this.data.push(item.data());
      }
      this.fetching = false;
    }, error => {
      this.fetching = false;
    });
  }

  lazyUserRef(lastVisible: any, search, filter) {
    return this.afs.collection<any>("products", ref => {
      let condition = ref
        // .where("status.key", "==", 1)
        .orderBy("updatedAt", "desc")
        .limit(10)
      if (search) {
        const txt = GenerateKeywordService.toCapitalize(search)
        condition = condition.where('keywords', 'array-contains', txt)
      }
      if (lastVisible) {
        condition = condition.startAfter(lastVisible)
      }
      return condition
    })

  }
}

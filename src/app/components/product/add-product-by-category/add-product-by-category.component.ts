import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Gallery } from 'src/app/models/gallery.model';
import { v4 as uuidv4 } from 'uuid';

import { BrandMappingService } from 'src/app/services/mapping/brand-mapping.service';
import { CategoryMappingService } from 'src/app/services/mapping/category-mapping.service';

import { BrandStore } from 'src/app/stores/brand.store';
import { CategoryStore } from 'src/app/stores/category.store';
import { ProductStore } from 'src/app/stores/product.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { SubSubCategoryStore } from 'src/app/stores/subsubcategory.store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-add-product-by-category',
  templateUrl: './add-product-by-category.component.html',
  styleUrls: ['./add-product-by-category.component.scss']
})
export class AddProductByCategoryComponent implements OnInit {

  addProductForm;

  @ViewChild('fileUpload') fileUpload : any;

  color;

  percentage: Observable<number>;
  downloadURL: string;

  imageFile: File;
  selectedFiles: any[] = [];
  firebaseUploadedImages: Gallery[] = [];

  task: AngularFireUploadTask;

  constructor(
    public storage: AngularFireStorage,
    public formBuilder: FormBuilder,

    public categoryMapping: CategoryMappingService,
    public brandMapping: BrandMappingService,

    public brandStore: BrandStore,
    public productStore: ProductStore,
    public categoryStore: CategoryStore,
    public subCategoryStore: SubCategoryStore,
    public subSubCategoryStore: SubSubCategoryStore,

    @Inject(MAT_DIALOG_DATA) public data : Category
  ) {
    this.addProductForm = this.formBuilder.group({
      itemCode: '',
      name: '',
      description: '',
      color: '',
      category: data,
      brand: '',
      image: null,
    });
  }

  ngOnInit(): void {
    this.brandStore.getBrands();
    this.categoryStore.getCategories();
    this.subCategoryStore.getCategories();
    this.subSubCategoryStore.getCategories();
  }

  compareFn(user1:any, user2: any) {
    return user1 && user2 ? user1.key === user2.key : user1 === user2;
  }

  onSubmit(formData) {
    this.startUpload(formData);
  }

  uploadFileChange(event: any) {
    this.selectedFiles = event.currentFiles;
  }

  insertDataIntoFirebase(formData) {
    const { itemCode, name, description, category, brand, color } = formData;

    const data = {
      itemCode,
      name,
      description,
      category: this.data,
      brand,
      color,
      images: this.firebaseUploadedImages,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.productStore.addProduct(data);
    this.color= "#ffffff";
    this.firebaseUploadedImages = [];
    this.addProductForm.reset();
    this.fileUpload.clear();
  }

  startUpload(formData) {
    this.selectedFiles.forEach((item) => {
      const path = `products/${Date.now()}_${item.name}`;
      const ref = this.storage.ref(path);

      this.task = this.storage.upload(path, item);
      this.percentage = this.task.percentageChanges();

      this.task.then((f) => {
        f.ref.getDownloadURL().then((url) => {
          let elementGallery: Gallery = {
            id: uuidv4(),
            image: url,
            imagePath: path,
          };

          this.firebaseUploadedImages.push(elementGallery)

          if(this.firebaseUploadedImages.length == this.selectedFiles.length)
            this.insertDataIntoFirebase(formData);
        });
      });
    })
  }
}

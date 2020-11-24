import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Brand } from 'src/app/models/brand.model';
import { Category } from 'src/app/models/category.model';
import { Gallery } from 'src/app/models/gallery.model';
import { Product } from 'src/app/models/product.model';

import { BrandMappingService } from 'src/app/services/mapping/brand-mapping.service';
import { CategoryMappingService } from 'src/app/services/mapping/category-mapping.service';

import { BrandStore } from 'src/app/stores/brand.store';
import { CategoryStore } from 'src/app/stores/category.store';
import { ProductStore } from 'src/app/stores/product.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { SubSubCategoryStore } from 'src/app/stores/subsubcategory.store';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  editProductForm;

  @ViewChild('fileUpload') fileUpload : any;

  color;
  images: Gallery[] = [];
  deletedImages: Gallery[] = [];
  text: string;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  imageFile: File;
  selectedFiles: any[] = [];
  firebaseUploadedImages: Gallery[] = [];

  task: AngularFireUploadTask;

  selectedCategory: Category;
  selectedBrand;

  constructor(
    public formBuilder: FormBuilder,

    public categoryMapping: CategoryMappingService,
    public brandMapping: BrandMappingService,

    public brandStore: BrandStore,
    public productStore: ProductStore,
    public categoryStore: CategoryStore,
    public subCategoryStore: SubCategoryStore,
    public subSubCategoryStore: SubSubCategoryStore,
    private _snackBar: MatSnackBar,

    public storage: AngularFireStorage,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.editProductForm = this.formBuilder.group({
      itemCode: data.itemCode,
      name: data.name,
      description: data.description,
      color: data.color,
      category: data.category ? data.category : null,
      brand: data.brand ? data.brand : null,
      images: null,
    });

    this.color = data.color;
    this.text = data.description;
    this.selectedBrand = this.brandMapping.MapBrandObj(data.brand);
    this.selectedCategory = data.category;
    this.images = data.images;
  }

  ngOnInit(): void {
    this.categoryStore.getCategories();
    this.subCategoryStore.getCategories();
    this.subSubCategoryStore.getCategories();
    this.brandStore.getBrands();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  compareFn(user1:any, user2: any) {
    return user1 && user2 ? user1.key === user2.key : user1 === user2;
  }

  onSubmit(formData) {
    if(this.selectedFiles.length == 0)
      this.updateDataInFirebase(formData);
    else
      this.startUpload(formData);
  }

  deleteImageFromGallery(item) {
    this.deletedImages.push(item);
    this.images = this.images.filter((image) => image.id != item.id)
  }

  uploadFileChange(event: any) {
    this.selectedFiles = event.currentFiles;
  }

  updateDataInFirebase(formData) {
    const { itemCode, name, description, color, category, brand } = formData;

    this.firebaseUploadedImages.forEach((uploadedImage) => {
      this.images.push(uploadedImage)
    })

    const data = {
      key: this.data.key,
      itemCode,
      name,
      description,
      category,
      brand,
      color,
      images: this.images,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      published: true
    };

    this.deletedImages.forEach((item) => {
      this.productStore.deleteImageProduct(item.imagePath);
    })
    this.productStore.updateProduct(data);
    this.fileUpload.clear();
    this.firebaseUploadedImages = [];
    this.selectedFiles = [];

    this.openSnackBar('Edit Product Successfully.', 'Close');
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
            this.updateDataInFirebase(formData);
        });
      });
    })
  }
}

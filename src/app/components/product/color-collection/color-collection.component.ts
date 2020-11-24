import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { ProductColorStore } from 'src/app/stores/productColor.store';
import { ProductStore } from 'src/app/stores/product.store';

@Component({
  selector: 'app-color-collection',
  templateUrl: './color-collection.component.html',
  styleUrls: ['./color-collection.component.scss']
})
export class ColorCollectionComponent implements OnInit {
  @Input() product_data;
  @Input() product_id;

  @ViewChild('fileUpload') fileUpload:any;

  addColorForm;

  colorCode;
  downloadURL: string;
  imageFile: File;
  selectedFiles: any[] = [];
  firebaseUploadedImages = [];

  task: AngularFireUploadTask;

  constructor(
    public formBuild: FormBuilder,
    public storage: AngularFireStorage,
    private dialog: MatDialog,
    private route: ActivatedRoute,

    public productStore: ProductStore,
    public productColorStore: ProductColorStore,
  ) {
    this.addColorForm = this.formBuild.group({
      color: '',
      colorCode: '',
      images: null
    })
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id ? this.route.snapshot.params.id : this.product_id;
    this.productStore.getColorCollection(id);
  }

  uploadFileChange(event: any) {
    this.selectedFiles = event.currentFiles;
  }

  insertProductColorIntoFirebase(data) {
    this.firebaseUploadedImages.forEach((item) => {
      let colorCollectionElement = {
        color: data.color,
        colorCode: data.colorCode ? data.colorCode : '#FFFFFF',
        image: item.image,
        imagePath: item.imagePath,
        productId: this.product_data.key
      };

      this.productStore.addColorToColorCollection(colorCollectionElement, this.product_data.key);
    })

    this.firebaseUploadedImages = [];
    this.addColorForm.reset();
    this.fileUpload.clear();
    this.selectedFiles = [];
  }

  startUpload(formData) {
    this.selectedFiles.forEach((item) => {
      const path = `products/${Date.now()}_${item.name}`;
      const ref = this.storage.ref(path);

      this.task = this.storage.upload(path, item);

      this.task.then((f) => {
        f.ref.getDownloadURL().then((url) => {
          let elementGallery = {
            image: url,
            imagePath: path,
          };

          this.firebaseUploadedImages.push(elementGallery);

          if(this.firebaseUploadedImages.length == this.selectedFiles.length)
            this.insertProductColorIntoFirebase(formData);
        });
      });
    })
  }

  onSubmit(formData) {
    this.startUpload({ ...formData, colorCode: this.colorCode })
  }

  deleteColorFromCollection(data) {
    this.productStore.deleteColorFromColorCollection(data)
  }

  clearForm() {
    this.firebaseUploadedImages = [];
    this.addColorForm.reset();
    this.fileUpload.clear();
    this.selectedFiles = [];
  }
}
